import React, {
  type ChangeEvent,
  type FC,
  type FocusEvent,
  useEffect,
  useRef,
} from 'react';

import IMask from 'imask';

import type { PhoneInputProps } from '@/ui/inputs/types';

import styles from './styles/PhoneInput.module.scss';

import { BaseInput } from '../baseInput/BaseInput';

export const PhoneInput: FC<PhoneInputProps> = ({
  value = '',
  onChange,
  placeholder = '+380 (__) ___ __ __',
  onFocus,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current) {
      maskRef.current = IMask(inputRef.current, {
        mask: '+\\3\\8\\0 (00) 000 00 00',
        lazy: false,
        placeholderChar: '_',
      });

      if (value) maskRef.current.value = String(value);

      const handleAccept = (): void => {
        if (onChange && maskRef.current) {
          onChange({
            target: { value: maskRef.current.value },
          } as ChangeEvent<HTMLInputElement>);
        }
      };

      maskRef.current.on('accept', handleAccept);

      return (): void => {
        if (maskRef.current) maskRef.current.destroy();
      };
    }
  }, [value, onChange]);

  useEffect(() => {
    if (maskRef.current && value !== maskRef.current.value) {
      maskRef.current.value = String(value);
    }
  }, [value]);

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(e);

    setTimeout(() => {
      if (inputRef.current && (!value || String(value).length <= 6)) {
        inputRef.current.setSelectionRange(6, 6);
      }
    }, 0);
  };

  return (
    <div className={styles.phone__wrapper}>
      <BaseInput
        ref={inputRef}
        value={value}
        onChange={() => {}}
        onFocus={handleFocus}
        placeholder={placeholder}
        type="tel"
        {...props}
      />
    </div>
  );
};
