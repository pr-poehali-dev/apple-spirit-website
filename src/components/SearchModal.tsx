import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const allProducts: Product[] = [
  { id: 1, name: 'Пуговицы перламутровые', category: 'buttons', price: '120 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 2, name: 'Молния металлическая', category: 'zippers', price: '180 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
  { id: 3, name: 'Нитки полиэстер 40/2', category: 'threads', price: '95 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 4, name: 'Кнопки декоративные', category: 'accessories', price: '150 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 5, name: 'Пуговицы деревянные', category: 'buttons', price: '140 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 6, name: 'Молния спиральная', category: 'zippers', price: '160 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
  { id: 7, name: 'Лента атласная 25мм', category: 'ribbons', price: '85 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 8, name: 'Лента репсовая с рисунком', category: 'ribbons', price: '110 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 9, name: 'Люверсы металлические', category: 'metal', price: '200 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
  { id: 10, name: 'Пряжки металлические', category: 'metal', price: '175 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
  { id: 11, name: 'Крючки и петли', category: 'metal', price: '130 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/4473f4ad-8901-4428-a3f8-a55f2b17184f.jpg' },
  { id: 12, name: 'Фиксаторы пластиковые', category: 'plastic', price: '65 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 13, name: 'Карабины пластиковые', category: 'plastic', price: '80 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 14, name: 'Пуллеры для молний', category: 'plastic', price: '45 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 15, name: 'Подплечники реглан', category: 'shoulder', price: '190 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 16, name: 'Подплечники прямые', category: 'shoulder', price: '170 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 17, name: 'Бретельки силиконовые', category: 'underwear', price: '55 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 18, name: 'Косточки для бюстгальтера', category: 'underwear', price: '75 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 19, name: 'Регуляторы для бретелей', category: 'underwear', price: '50 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 20, name: 'Шнур вощёный 2мм', category: 'cords', price: '70 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 21, name: 'Шнур декоративный плетёный', category: 'cords', price: '105 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 22, name: 'Шнур эластичный', category: 'cords', price: '60 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 23, name: 'Подкладка вискоза', category: 'lining', price: '280 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 24, name: 'Подкладка атлас', category: 'lining', price: '320 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 25, name: 'Флизелин клеевой', category: 'lining', price: '95 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/48424235-062c-44e5-b4ec-a0df90b538da.jpg' },
  { id: 26, name: 'Пакеты для упаковки 20х30', category: 'bags', price: '35 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 27, name: 'Пакеты zip-lock', category: 'bags', price: '55 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
  { id: 28, name: 'Пакеты с клапаном', category: 'bags', price: '45 ₽', image: 'https://cdn.poehali.dev/projects/e7e9e9b8-0dff-4ddf-a7ac-0d94918f3cc7/files/c216cdcd-1943-4798-bafa-d1c0c450e192.jpg' },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(results);
  }, [searchQuery]);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setFilteredProducts([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Поиск товаров</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Введите название товара..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-20" />
              <p>Начните вводить название товара</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="PackageX" size={48} className="mx-auto mb-4 opacity-20" />
              <p>Товары не найдены</p>
              <p className="text-sm mt-2">Попробуйте изменить запрос</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 py-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary">{product.price}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          addToCart(product);
                          onOpenChange(false);
                        }}
                        className="flex-shrink-0"
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
