import { IMaskMixin } from 'react-imask';

import type { PhoneInputProps } from '@/ui/inputs/types';

import styles from './styles/PhoneInput.module.scss';

import { BaseInput } from '../baseInput/BaseInput';

export const PhoneInput = IMaskMixin<HTMLInputElement, PhoneInputProps>(
  ({ inputRef, ...props }) => (
    <div className={styles.phone__wrapper}>
      <BaseInput
        {...props}
        ref={inputRef}
        type="tel"
        placeholder="+380 (__) ___ __ __"
      />
    </div>
  ),
);

PhoneInput.displayName = 'PhoneInput';
