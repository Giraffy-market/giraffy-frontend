import React, { type FC } from 'react';

import type { PhoneInputProps } from '@/ui/inputs/types';

import styles from './styles/PhoneInput.module.scss';

import { BaseInput } from '../baseInput/BaseInput';

export const PhoneInput: FC<PhoneInputProps> = ({
  value = '',
  placeholder = '+380 (__) ___ __ __',
  onChange,
  ...props
}) => {
  return (
    <div className={styles.phone__wrapper}>
      <BaseInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="tel"
        {...props}
      />
    </div>
  );
};
