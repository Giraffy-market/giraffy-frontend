'use client';

import { type ForwardedRef, forwardRef } from 'react';

import cn from 'classnames';

import './styles/BaseInput.scss';

import type { BaseInputProps } from '../types';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { Icon, id, labelText, iconPosition = 'left', className, ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label htmlFor={id} className={className}>
        {labelText && <span className="base-input__label">{labelText}</span>}

        <div className="base-input">
          {iconPosition === 'left' && Icon && (
            <Icon
              className={cn('base-input__icon', 'base-input__icon--left')}
            />
          )}

          <input
            ref={ref}
            id={id}
            className={cn('base-input__field', {
              ['base-input__field--with-icon']: Icon,
            })}
            {...props}
          />

          {iconPosition === 'right' && Icon && (
            <Icon
              className={cn('base-input__icon', 'base-input__icon--right')}
            />
          )}
        </div>
      </label>
    );
  },
);

BaseInput.displayName = 'BaseInput';
