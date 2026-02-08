'use client';

import { type FC, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

type Props = {
  message?: string | string[];
  type?: 'info' | 'success' | 'error' | 'warning';
};

export const ToastMessage: FC<Props> = ({ message, type = 'info' }) => {
  const shown = useRef(false);

  useEffect(() => {
    if (!message || shown.current) return;

    const displayMessage = Array.isArray(message)
      ? message.join('\n')
      : message;

    shown.current = true; // Флаг, чтобы не показывать тост повторно

    switch (type) {
      case 'success':
        toast.success(displayMessage);
        break;
      case 'error':
        toast.error(displayMessage);
        break;
      case 'warning':
        toast.warning(displayMessage);
        break;
      default:
        toast(displayMessage);
    }
  }, [message, type]);

  return null;
};
