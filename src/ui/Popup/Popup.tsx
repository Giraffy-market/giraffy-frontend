'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import type { PopupProps } from './shared/types/PopupProps';

import CloseIcon from './assets/closeIcon.svg';

import './styles/Popup.scss';

export const Popup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>): void => {
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      onClose={onClose}
      onClick={handleBackdrop}
    >
      <button
        className="dialog__closeButton"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        <CloseIcon
          className="dialog__closeIcon"
          role="img"
          aria-label="Close icon"
        />
      </button>

      {children}
    </dialog>
  );
};
