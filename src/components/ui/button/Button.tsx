'use client';

import { type FC } from 'react';

import cn from 'classnames';

import type { BaseButtonProps } from './types/baseButtonProps';

import './styles/button.scss';

export const Button: FC<BaseButtonProps> = ({ text, variant, ...props }) => {
  return (
    <button
      className={cn('button', {
        ['primary']: variant === 'primary',
        ['outline']: variant === 'outline',
        ['gradient']: variant === 'gradient',
        ['ghost']: variant === 'ghost',
        ['smallest']: variant === 'smallest',
      })}
      {...props}
    >
      {text}
    </button>
  );
};
