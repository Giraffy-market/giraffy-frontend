import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant: 'primary' | 'outline' | 'gradient' | 'ghost' | 'smallest';
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
