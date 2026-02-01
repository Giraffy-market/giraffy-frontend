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

export type PhoneInputProps = IMaskMixinProps<HTMLInputElement> & {
  className?: string;
  labelText?: string;
  id?: string;
  error?: string;
  isInvalid?: boolean;
};
