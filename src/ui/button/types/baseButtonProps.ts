import type { ButtonHTMLAttributes, ElementType } from 'react';

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant:
    | 'primary'
    | 'primary_with_icon'
    | 'outline'
    | 'gradient'
    | 'ghost'
    | 'smallest';
  Icon?: ElementType;
};
