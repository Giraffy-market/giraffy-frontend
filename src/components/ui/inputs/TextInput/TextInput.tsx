'use client';

import {
  type ElementType,
  type ForwardedRef,
  type TextareaHTMLAttributes,
  forwardRef,
} from 'react';

import cn from 'classnames';

import './styles/TextInput.scss';

interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  Icon?: ElementType;
  iconPosition?: 'left' | 'right';
  error?: string;
  isInvalid?: boolean;
}

export const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  (
    {
      Icon,
      id,
      labelText,
      onChange,
      iconPosition = 'left',
      className,
      error,
      isInvalid,
      ...props
    },
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <label htmlFor={id} className="base-input__label-wrapper">
        {labelText && <span className="base-input__label">{labelText}</span>}

        <div className={cn('base-input', 'base-input--textarea')}>
          {iconPosition === 'left' && Icon && (
            <Icon className="base-input__icon base-input__icon--left" />
          )}

          <textarea
            ref={ref}
            id={id}
            onChange={onChange}
            className={cn(
              'base-input__field',
              'base-input__field--textarea',
              className,
            )}
            {...props}
          />

          {iconPosition === 'right' && Icon && (
            <Icon className="base-input__icon base-input__icon--right" />
          )}
        </div>
        <div className="base-input__error-box">
          {isInvalid && error && (
            <span className="base-input__error-message">{error}</span>
          )}
        </div>
      </label>
    );
  },
);

TextInput.displayName = 'TextInput';
