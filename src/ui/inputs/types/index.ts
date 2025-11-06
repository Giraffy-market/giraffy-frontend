import type {
  ChangeEventHandler,
  ElementType,
  InputHTMLAttributes,
} from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  Icon?: ElementType;
  value?: string | number;
  iconPosition?: 'left' | 'right';
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export type PasswordInputProps = Omit<BaseInputProps, 'type'> & {
  showPasswordToggle?: boolean;
};

export type PhoneInputProps = Omit<BaseInputProps, 'type'> & {
  placeholder?: string;
};
