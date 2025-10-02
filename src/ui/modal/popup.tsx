'use client';

import type { FC, ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';

import styles from './Popup.module.scss';
import CloseIcon from './closeIcon.svg';

export type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Popup: FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const headingId = useId();

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    const canShowModal = typeof (dlg as any).showModal === 'function';

    try {
      if (isOpen) {
        if (!dlg.open) {
          if (canShowModal) {
            dlg.showModal();
            dlg.removeAttribute('inert');
          } else {
            dlg.setAttribute('open', '');
          }
        }
      } else {
        if (dlg.open) dlg.close();
        dlg.setAttribute('inert', '');
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Popup] showModal/close error:', err);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dlg.addEventListener('cancel', onCancel);
    return () => dlg.removeEventListener('cancel', onCancel);
  }, [onClose]);

  const onClickBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
  if (e.currentTarget === e.target) onClose();
};

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-modal="true"
      aria-labelledby={headingId}
      onClick={onClickBackdrop}
    >
      <div className={styles.panel} role="document">
        <button
          className={styles.closeButton}
          onClick={onClose}
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
