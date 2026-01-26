'use client';

import { type FC, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

type Props = {
  message?: string;
  type?: 'info' | 'success' | 'error' | 'warning';
};

export const ToastMessage: FC<Props> = ({ message, type = 'info' }) => {
  const shown = useRef(false);

  useEffect(() => {
    if (!message || shown.current) return;
    shown.current = true; // Флаг, чтобы не показывать тост повторно

    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  }, [message, type]);

  return null;
};
