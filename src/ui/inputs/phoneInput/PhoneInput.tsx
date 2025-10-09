import { type FC } from 'react';

import { useMask } from '@react-input/mask';

import type { PhoneInputProps } from '@/ui/inputs/types';

import styles from './styles/PhoneInput.module.scss';

import { BaseInput } from '../baseInput/BaseInput';

const PHONE_MASK = '+380 (__) ___ __ __';

export const PhoneInput: FC<PhoneInputProps> = ({
  value = '',
  onChange,
  ...props
}) => {
  const options = {
    mask: PHONE_MASK,
    replacement: { _: /\d/ },
  };

  const inputRef = useMask(options);

  return (
    <div className={styles.phone__wrapper}>
      <BaseInput
        value={value}
        onChange={onChange}
        placeholder={PHONE_MASK}
        type="tel"
        ref={inputRef}
        {...props}
      />
    </div>
  );
};
