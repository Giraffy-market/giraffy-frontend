'use client';

import type { FC, ReactNode } from 'react';
import { useId, useRef } from 'react';

import styles from './Popup.module.scss';
import CloseIcon from './closeIcon.svg';

export type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Popup: FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  const setRef = (node: HTMLDialogElement | null) => {
    if (!node) return;
    ref.current = node;
    if (!node.open) node.showModal();
  };

  const handleClose = () => onClose();

  const handleCancel: React.ReactEventHandler<HTMLDialogElement> = (e) => {
    // Блокируем дефолтный "cancel", чтобы не закрывалось мимо нашей логики
    e.preventDefault();
    ref.current?.close();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) ref.current?.close();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={setRef}
      className={styles.dialog}
      aria-modal="true"
      aria-labelledby={headingId}
      onClose={handleClose}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel} role="document">
        <button
          className={styles.closeButton}
          onClick={() => ref.current?.close()}
          aria-label="Close"
          type="button"
        >
          <img className={styles.closeIcon} src={CloseIcon.src} alt="" />
        </button>

        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>

        <div className={styles.content}>{children}</div>
      </div>
    </dialog>
  );
};
