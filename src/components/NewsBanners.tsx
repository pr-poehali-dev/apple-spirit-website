import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function NewsBanners() {
  const banners = [
    {
      id: 1,
      title: 'Новое поступление японских молний YKK',
      description: 'Премиальные молнии YKK — мировой стандарт качества для профессионалов. Широкий выбор размеров и цветов в наличии',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg',
      badge: 'Новинка',
      buttonText: 'Смотреть молнии',
      gradient: 'from-primary/90 to-primary/70'
    },
    {
      id: 2,
      title: 'Скидки до 40% на зимнюю коллекцию',
      description: 'Специальное предложение на весь ассортимент подкладочных тканей и утеплителей до конца января 2025',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg',
      badge: 'Акция',
      buttonText: 'К акциям',
      gradient: 'from-accent/90 to-accent/70'
    },
    {
      id: 3,
      title: 'Открытие нового шоурума в Москве',
      description: 'Приглашаем посетить наш новый выставочный зал на Тверской улице. Более 3000 образцов фурнитуры для осмотра',
      image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg',
      badge: 'Событие',
      buttonText: 'Узнать адрес',
      gradient: 'from-secondary/90 to-secondary/70'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="space-y-6">
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-2xl h-[300px] md:h-[400px] group fade-on-scroll"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
              
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-2xl">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4">
                      {banner.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                      {banner.description}
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-white text-primary hover:bg-white/90 h-12 px-8"
                    >
                      {banner.buttonText}
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}