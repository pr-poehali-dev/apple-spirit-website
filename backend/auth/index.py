import json
import os
import hashlib
import secrets
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import psycopg2

def handler(event: dict, context) -> dict:
    '''Регистрация, авторизация и управление пользователями'''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('action', 'login')
    
    try:
        if path == 'register':
            return handle_register(event)
        elif path == 'login':
            return handle_login(event)
        elif path == 'logout':
            return handle_logout(event)
        elif path == 'me':
            return handle_get_user(event)
        elif path == 'forgot-password':
            return handle_forgot_password(event)
        elif path == 'reset-password':
            return handle_reset_password(event)
        else:
            return error_response(400, 'Invalid action')
    except Exception as e:
        return error_response(500, str(e))

def handle_register(event: dict) -> dict:
    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    
    if not email or not password or not name:
        return error_response(400, 'Email, password and name are required')
    
    if len(password) < 6:
        return error_response(400, 'Password must be at least 6 characters')
    
    password_hash = hash_password(password)
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return error_response(400, 'Email already registered')
        
        cursor.execute(
            "INSERT INTO users (email, password_hash, name, phone) VALUES (%s, %s, %s, %s) RETURNING id",
            (email, password_hash, name, phone)
        )
        user_id = cursor.fetchone()[0]
        
        session_token = create_session(cursor, user_id)
        
        conn.commit()
        
        return success_response({
            'sessionToken': session_token,
            'user': {
                'id': user_id,
                'email': email,
                'name': name,
                'phone': phone
            }
        })
    finally:
        conn.close()

def handle_login(event: dict) -> dict:
    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    
    if not email or not password:
        return error_response(400, 'Email and password are required')
    
    password_hash = hash_password(password)
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute(
            "SELECT id, email, name, phone, password_hash FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()
        
        if not user or user[4] != password_hash:
            return error_response(401, 'Invalid email or password')
        
        session_token = create_session(cursor, user[0])
        
        conn.commit()
        
        return success_response({
            'sessionToken': session_token,
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'phone': user[3]
            }
        })
    finally:
        conn.close()

def handle_logout(event: dict) -> dict:
    session_token = event.get('headers', {}).get('x-session-token') or event.get('headers', {}).get('X-Session-Token')
    
    if not session_token:
        return error_response(400, 'Session token required')
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("UPDATE user_sessions SET expires_at = NOW() WHERE session_token = %s", (session_token,))
        conn.commit()
        
        return success_response({'message': 'Logged out successfully'})
    finally:
        conn.close()

def handle_get_user(event: dict) -> dict:
    session_token = event.get('headers', {}).get('x-session-token') or event.get('headers', {}).get('X-Session-Token')
    
    if not session_token:
        return error_response(401, 'Session token required')
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute(
            """
            SELECT u.id, u.email, u.name, u.phone 
            FROM users u
            JOIN user_sessions s ON u.id = s.user_id
            WHERE s.session_token = %s AND s.expires_at > NOW()
            """,
            (session_token,)
        )
        user = cursor.fetchone()
        
        if not user:
            return error_response(401, 'Invalid or expired session')
        
        return success_response({
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'phone': user[3]
            }
        })
    finally:
        conn.close()

def handle_forgot_password(event: dict) -> dict:
    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    
    if not email:
        return error_response(400, 'Email is required')
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, name, email FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if not user:
            return success_response({'message': 'If email exists, reset code will be sent'})
        
        reset_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        expires_at = datetime.now() + timedelta(hours=1)
        
        cursor.execute(
            "INSERT INTO password_reset_tokens (user_id, reset_token, expires_at) VALUES (%s, %s, %s)",
            (user[0], reset_code, expires_at)
        )
        
        send_reset_email(user[2], user[1], reset_code)
        
        conn.commit()
        
        return success_response({'message': 'Reset code sent to email'})
    finally:
        conn.close()

def handle_reset_password(event: dict) -> dict:
    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    reset_code = body.get('code', '').strip()
    new_password = body.get('newPassword', '')
    
    if not email or not reset_code or not new_password:
        return error_response(400, 'Email, code and new password are required')
    
    if len(new_password) < 6:
        return error_response(400, 'Password must be at least 6 characters')
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute(
            """
            SELECT rt.id, rt.user_id 
            FROM password_reset_tokens rt
            JOIN users u ON rt.user_id = u.id
            WHERE u.email = %s AND rt.reset_token = %s 
            AND rt.expires_at > NOW() AND rt.used = FALSE
            ORDER BY rt.created_at DESC
            LIMIT 1
            """,
            (email, reset_code)
        )
        token = cursor.fetchone()
        
        if not token:
            return error_response(400, 'Invalid or expired reset code')
        
        password_hash = hash_password(new_password)
        
        cursor.execute(
            "UPDATE users SET password_hash = %s, updated_at = NOW() WHERE id = %s",
            (password_hash, token[1])
        )
        
        cursor.execute(
            "UPDATE password_reset_tokens SET used = TRUE WHERE id = %s",
            (token[0],)
        )
        
        conn.commit()
        
        return success_response({'message': 'Password reset successfully'})
    finally:
        conn.close()

def send_reset_email(to_email: str, name: str, reset_code: str):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Восстановление пароля - ТК Эксклюзив'
    msg['From'] = 'noreply@tkexclusiv.ru'
    msg['To'] = to_email
    
    html_content = f'''
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Восстановление пароля
          </h2>
          
          <p>Здравствуйте, {name}!</p>
          
          <p>Вы запросили восстановление пароля для вашего аккаунта на сайте ТК Эксклюзив.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">Ваш код восстановления:</p>
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb; margin: 0;">
              {reset_code}
            </p>
          </div>
          
          <p>Введите этот код на странице восстановления пароля.</p>
          
          <p style="color: #ef4444; font-size: 14px;">
            ⚠️ Код действителен в течение 1 часа.
          </p>
          
          <p style="font-size: 14px; color: #6b7280;">
            Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #9ca3af;">
            <p>С уважением,<br>Команда ТК Эксклюзив</p>
          </div>
        </div>
      </body>
    </html>
    '''
    
    text_content = f'''
Восстановление пароля

Здравствуйте, {name}!

Вы запросили восстановление пароля для вашего аккаунта на сайте ТК Эксклюзив.

Ваш код восстановления: {reset_code}

Введите этот код на странице восстановления пароля.

Код действителен в течение 1 часа.

Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.

С уважением,
Команда ТК Эксклюзив
    '''
    
    part1 = MIMEText(text_content, 'plain')
    part2 = MIMEText(html_content, 'html')
    
    msg.attach(part1)
    msg.attach(part2)
    
    try:
        with smtplib.SMTP('localhost', 25) as server:
            server.send_message(msg)
    except Exception as e:
        print(f'Failed to send email: {str(e)}')

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_session(cursor, user_id: int) -> str:
    session_token = secrets.token_urlsafe(32)
    expires_at = datetime.now() + timedelta(days=30)
    
    cursor.execute(
        "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s)",
        (user_id, session_token, expires_at)
    )
    
    return session_token

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def success_response(data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data),
        'isBase64Encoded': False
    }

def error_response(status: int, message: str) -> dict:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': message}),
        'isBase64Encoded': False
    }