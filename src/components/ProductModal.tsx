import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryNames: Record<string, string> = {
    buttons: 'Пуговицы',
    zippers: 'Молнии',
    threads: 'Нитки',
    accessories: 'Аксессуары',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription>
            <Badge variant="secondary" className="mt-2">
              {categoryNames[product.category]}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-4">{product.price}</div>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Высокое качество материалов</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Сертифицированная продукция</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Быстрая доставка по России</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Гарантия возврата 14 дней</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6 mt-auto">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Артикул:</span>
                  <span className="font-medium">TK-{product.id.toString().padStart(5, '0')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Наличие:</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <Icon name="Check" size={16} />
                    В наличии
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка:</span>
                  <span className="font-medium">1-2 дня</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-12" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={added}
                >
                  {added ? (
                    <>
                      <Icon name="Check" className="mr-2" size={20} />
                      Добавлено
                    </>
                  ) : (
                    <>
                      <Icon name="ShoppingCart" className="mr-2" size={20} />
                      В корзину
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" className="h-12 w-12 p-0">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-semibold mb-3">Описание товара</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Высококачественная швейная фурнитура от проверенных европейских производителей. 
            Идеально подходит для профессионального использования и домашнего шитья. 
            Прочная, долговечная и удобная в работе. Соответствует всем стандартам качества.
          </p>
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Бесплатная доставка</p>
            <p className="text-muted-foreground">При заказе от 5000 ₽ доставка по Москве бесплатная</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}