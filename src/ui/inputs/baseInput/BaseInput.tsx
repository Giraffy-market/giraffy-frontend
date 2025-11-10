import { type ForwardedRef, forwardRef } from 'react';

import cn from 'classnames';

import './styles/BaseInput.scss';

import type { BaseInputProps } from '../types';

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      Icon,
      value = '',
      id,
      labelText,
      onChange,
      iconPosition = 'left',
      ...props
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label htmlFor={id}>
        {labelText && <span className="base-input__label">{labelText}</span>}

        <div className="base-input">
          {iconPosition === 'left' && Icon && (
            <Icon
              className={cn('base-input__icon', 'base-input__icon--left')}
            />
          )}

          <input
            ref={ref}
            className={cn('base-input__field', {
              ['base-input__field--with-icon']: Icon,
            })}
            value={value}
            id={id}
            onChange={onChange}
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
