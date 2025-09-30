import { type ForwardedRef, forwardRef, memo } from 'react';

import s from './styles/BaseInput.module.scss';

import type { BaseInputProps } from '../types';

export const BaseInput = memo(
  forwardRef<HTMLInputElement, BaseInputProps>(
    (
      { Icon, value = '', onChange, ...props },
      ref: ForwardedRef<HTMLInputElement>,
    ) => {
      return (
        <div className={s.input__wrapper}>
          {Icon && <Icon className={s.input__icon} />}

          <input
            ref={ref}
            className={`${s.input} ${Icon ? s.input_with_icon : ''}`}
            value={value}
            onChange={onChange}
            {...props}
          />
        </div>
      );
    },
  ),
);

BaseInput.displayName = 'BaseInput';
