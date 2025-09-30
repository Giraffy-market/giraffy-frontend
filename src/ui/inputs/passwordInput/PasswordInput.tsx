import { type FC, memo, useCallback, useState } from 'react';

import { ShowPasswordUnchecked } from '@/ui/inputs/passwordInput/assets/index';

import s from './styles/PasswordInput.module.scss';

import { BaseInput } from '../baseInput/BaseInput';
import type { PasswordInputProps } from '../types';

export const PasswordInput: FC<PasswordInputProps> = memo(({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  return (
    <div className={s.password__wrapper}>
      <BaseInput {...props} type={isPasswordVisible ? 'password' : 'text'} />

      <button
        type="button"
        className={`${s.password__toggle} ${!isPasswordVisible && s.active}`}
        onClick={togglePasswordVisibility}
        aria-label={isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'}
      >
        <ShowPasswordUnchecked className={s.password__icon} />
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
