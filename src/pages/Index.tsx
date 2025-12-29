import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

function Index() {
  const [activeCategory, setActiveCategory] = useState('all');
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    setTimeout(() => setIsVisible(true), 100);

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'Все', icon: 'Package' },
    { id: 'buttons', name: 'Пуговицы', icon: 'Circle' },
    { id: 'zippers', name: 'Молнии', icon: 'Minus' },
    { id: 'threads', name: 'Нитки', icon: 'Wind' },
    { id: 'accessories', name: 'Аксессуары', icon: 'Star' },
  ];

  const products = [
    { id: 1, name: 'Пуговицы перламутровые', category: 'buttons', price: '120 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 2, name: 'Молния металлическая', category: 'zippers', price: '180 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
    { id: 3, name: 'Нитки полиэстер 40/2', category: 'threads', price: '95 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
    { id: 4, name: 'Кнопки декоративные', category: 'accessories', price: '150 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 5, name: 'Пуговицы деревянные', category: 'buttons', price: '140 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
    { id: 6, name: 'Молния спиральная', category: 'zippers', price: '160 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
  ];

  const benefits = [
    { icon: 'Award', title: 'Премиум качество', description: 'Только сертифицированные материалы от проверенных производителей' },
    { icon: 'Truck', title: 'Быстрая доставка', description: 'Отправка заказов в течение 24 часов по всей России' },
    { icon: 'ShieldCheck', title: 'Гарантия', description: 'Возврат и обмен товара в течение 14 дней без вопросов' },
    { icon: 'Users', title: '10+ лет на рынке', description: 'Более 5000 довольных клиентов и партнеров' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">ШвейПро</div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">Преимущества</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
              <Button size="sm">Связаться</Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-32 md:py-48">
          <div className="container mx-auto px-6">
            <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
                Швейная фурнитура
                <br />
                <span className="text-primary">премиум-класса</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Качественные материалы для профессионалов и любителей шитья
              </p>
              <Button size="lg" className="h-14 px-8 text-lg">
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Каталог продукции</h2>
              <p className="text-lg text-muted-foreground">Широкий выбор швейной фурнитуры для любых задач</p>
            </div>

            <div className="fade-on-scroll flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(cat.id)}
                  className="gap-2"
                >
                  <Icon name={cat.icon as any} size={18} />
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <Card key={product.id} className="fade-on-scroll overflow-hidden group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Button size="sm" variant="outline">
                        <Icon name="ShoppingCart" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="fade-on-scroll max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Почему выбирают нас</h2>
              <p className="text-lg text-muted-foreground">Качество, надежность и профессионализм в каждой детали</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="fade-on-scroll text-center" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon name={benefit.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="fade-on-scroll text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Свяжитесь с нами</h2>
                <p className="text-lg text-muted-foreground">Ответим на все вопросы и поможем с выбором</p>
              </div>

              <Card className="fade-on-scroll">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                      <Input placeholder="Иван Иванов" className="h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="ivan@example.com" className="h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Сообщение</label>
                      <Textarea placeholder="Расскажите о ваших потребностях..." className="min-h-32 resize-none" />
                    </div>
                    <Button className="w-full h-12 text-base" size="lg">
                      Отправить сообщение
                      <Icon name="Send" className="ml-2" size={18} />
                    </Button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <Icon name="Phone" size={24} className="mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">+7 (495) 123-45-67</div>
                      </div>
                      <div>
                        <Icon name="Mail" size={24} className="mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">info@shveypro.ru</div>
                      </div>
                      <div>
                        <Icon name="MapPin" size={24} className="mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">Москва, ул. Примерная, 123</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/50 py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold tracking-tight">ШвейПро</div>
            <p className="text-sm text-muted-foreground">© 2024 ШвейПро. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;