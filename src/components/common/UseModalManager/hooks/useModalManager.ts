import { useState } from 'react';

type ModalType =
  | 'welcome'
  | 'error'
  | 'sendmessage'
  | 'successreview'
  | 'complaint'
  | null;

export const useModalManager = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return {
    activeModal,
    openModal,
    closeModal,
    isOpen: (type: ModalType) => activeModal === type,
  };
};
