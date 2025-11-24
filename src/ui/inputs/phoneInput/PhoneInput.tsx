import { forwardRef } from 'react';

import { useMask } from '@react-input/mask';

import type { PhoneInputProps } from '@/ui/inputs/types';

import styles from './styles/PhoneInput.module.scss';

import { BaseInput } from '../baseInput/BaseInput';

const PHONE_MASK = '+380 (__) ___ __ __';

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = '', onChange, ...props }, refFromRHF) => {
    const maskRef = useMask({
      mask: PHONE_MASK,
      replacement: { _: /\d/ },
    });

    return (
      <div className={styles.phone__wrapper}>
        <BaseInput
          value={value}
          onChange={onChange}
          placeholder={PHONE_MASK}
          type="tel"
          ref={(el: HTMLInputElement) => {
            if (typeof refFromRHF === 'function') {
              refFromRHF(el);
            } else if (refFromRHF) {
              refFromRHF.current = el;
            }

            if (maskRef) {
              maskRef.current = el;
            }
          }}
          {...props}
        />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';
