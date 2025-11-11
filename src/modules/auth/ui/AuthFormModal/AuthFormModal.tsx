import type { FC, ReactNode } from 'react';

import { Popup } from '@/ui/Popup/Popup';

type AuthFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const AuthFormModal: FC<AuthFormModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      {children}
    </Popup>
  );
};

export default AuthFormModal;
