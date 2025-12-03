'use client';

import { type FC } from 'react';

import cn from 'classnames';

import type { BaseButtonProps } from './types/baseButtonProps';

import './styles/button.scss';

export const Button: FC<BaseButtonProps> = ({
  text,
  variant,
  Icon,
  ...props
}) => {
  return (
    <button
      className={cn('button', {
        ['primary']: variant === 'primary',
        ['primary_with_icon']: variant === 'primary_with_icon',
        ['outline']: variant === 'outline',
        ['gradient']: variant === 'gradient',
        ['ghost']: variant === 'ghost',
        ['smallest']: variant === 'smallest',
      })}
      {...props}
    >
      {Icon && <Icon role="img" />}
      {text}
    </button>
  );
};
