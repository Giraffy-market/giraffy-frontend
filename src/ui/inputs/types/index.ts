import type { ElementType, InputHTMLAttributes } from 'react';
import type { IMaskMixinProps } from 'react-imask';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  Icon?: ElementType;
  labelText?: string;
  iconPosition?: 'left' | 'right';
};

export type PasswordInputProps = Omit<BaseInputProps, 'type'> & {
  showPasswordToggle?: boolean;
};

export type PhoneInputProps = IMaskMixinProps<HTMLInputElement> & {
  className?: string;
  labelText?: string;
  id?: string;
};
