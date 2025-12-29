import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function NewsBanners() {
  const news = [
    {
      id: 1,
      title: 'Новое поступление японских молний YKK',
      description: 'В нашем ассортименте появились премиальные молнии YKK — мировой стандарт качества для профессионалов',
      date: '25 декабря 2024',
      icon: 'Sparkles',
      color: 'from-primary/20 to-primary/5',
      badge: 'Новинка'
    },
    {
      id: 2,
      title: 'Скидки до 40% на зимнюю коллекцию',
      description: 'Специальное предложение на весь ассортимент подкладочных тканей и утеплителей до конца января',
      date: '20 декабря 2024',
      icon: 'Tag',
      color: 'from-accent/20 to-accent/5',
      badge: 'Акция'
    },
    {
      id: 3,
      title: 'Открытие нового шоурума в Москве',
      description: 'Приглашаем посетить наш новый выставочный зал на Тверской улице. Более 3000 образцов фурнитуры',
      date: '15 декабря 2024',
      icon: 'Store',
      color: 'from-secondary to-secondary/30',
      badge: 'Событие'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Важные новости</h2>
          <p className="text-muted-foreground text-lg">Следите за обновлениями и специальными предложениями</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <Card 
              key={item.id} 
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 fade-on-scroll"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={item.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{item.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Подробнее
                    <Icon name="ArrowRight" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
