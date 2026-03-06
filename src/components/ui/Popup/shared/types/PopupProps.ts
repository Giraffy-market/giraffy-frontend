import type { ReactNode } from 'react';

export type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
