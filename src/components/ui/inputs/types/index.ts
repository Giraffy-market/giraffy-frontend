import type { ElementType, InputHTMLAttributes } from 'react';
import type { IMaskMixinProps } from 'react-imask';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  Icon?: ElementType;
  labelText?: string;
  iconPosition?: 'left' | 'right';

  error?: string;
  isInvalid?: boolean;
};

export type PasswordInputProps = Omit<BaseInputProps, 'type'> & {
  showPasswordToggle?: boolean;
  error?: string;
  isInvalid?: boolean;
};

export type PhoneInputProps = InputHTMLAttributes<HTMLInputElement> &
  IMaskMixinProps<HTMLInputElement> & {
    labelText?: string;
    error?: string;
    isInvalid?: boolean;
  };
