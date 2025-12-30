import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const phones = [
    { number: '+78005007527', display: '8 (800) 500-75-27', label: 'Бесплатный звонок по России', primary: true },
    { number: '+79261081492', display: '8 (926) 108-14-92', label: '', primary: false },
    { number: '+79264309208', display: '8 (926) 430-92-08', label: '', primary: false },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Позвоните нам</DialogTitle>
          <DialogDescription>
            Выберите удобный номер для связи
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {phones.map((phone) => (
            <a
              key={phone.number}
              href={`tel:${phone.number}`}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md hover:scale-[1.02] ${
                phone.primary ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                phone.primary ? 'bg-primary text-white' : 'bg-secondary'
              }`}>
                <Icon name="Phone" size={24} />
              </div>
              <div className="flex-1">
                <div className={`font-semibold text-lg ${phone.primary ? 'text-primary' : ''}`}>
                  {phone.display}
                </div>
                {phone.label && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {phone.label}
                  </div>
                )}
              </div>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </a>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground text-center">
            Или напишите нам на{' '}
            <a href="mailto:info@tkexclusiv.ru" className="text-primary hover:underline">
              info@tkexclusiv.ru
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
