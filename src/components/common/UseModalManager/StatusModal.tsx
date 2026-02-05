import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';

import styles from './styles/StatusModal.module.scss';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText: string;
}

export const StatusModal = ({
  isOpen,
  onClose,
  title,
  description,
  buttonText,
}: StatusModalProps) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(5);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className={styles.overlay} />

      <DialogContent
        className={styles.modal}
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className={styles.title}>{title}</DialogTitle>
          <DialogDescription className={styles.description}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={styles.buttonWrapper}>
          <Button text={buttonText} variant="primary" onClick={onClose} />
          <span className={styles.timer}>
            (Вікно закриється за {timeLeft} секунд)
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
