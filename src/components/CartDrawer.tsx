import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Корзина</span>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart}>
                Очистить
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            {totalItems > 0 ? `Товаров: ${totalItems}` : 'Корзина пуста'}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
              <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Корзина пуста</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Добавьте товары из каталога, чтобы начать покупки
            </p>
            <Button onClick={() => onOpenChange(false)}>
              Перейти в каталог
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-lg border border-border bg-card">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                      <div className="text-primary font-bold mb-2">{item.price}</div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 flex-shrink-0"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span className="font-medium">{totalPrice} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="font-medium">
                    {totalPrice >= 5000 ? (
                      <span className="text-green-600">Бесплатно</span>
                    ) : (
                      '300 ₽'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Итого</span>
                  <span className="text-primary">
                    {totalPrice >= 5000 ? totalPrice : totalPrice + 300} ₽
                  </span>
                </div>
              </div>

              {totalPrice > 0 && totalPrice < 5000 && (
                <div className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                  <Icon name="Info" size={14} className="inline mr-1" />
                  Добавьте товаров на {5000 - totalPrice} ₽ для бесплатной доставки
                </div>
              )}

              <Button className="w-full h-12" size="lg">
                Оформить заказ
                <Icon name="ArrowRight" className="ml-2" size={18} />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
