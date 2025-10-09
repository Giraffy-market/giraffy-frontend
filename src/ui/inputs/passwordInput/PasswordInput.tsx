'use client';

import { type FC, useState } from 'react';

import cn from 'classnames';

import { ShowPasswordUnchecked } from '@/ui/inputs/passwordInput/assets/index';

import './styles/PasswordInput.scss';

import { BaseInput } from '../baseInput/BaseInput';
import type { PasswordInputProps } from '../types';

export const PasswordInput: FC<PasswordInputProps> = ({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <label className="password__wrapper">
      <BaseInput {...props} type={isPasswordVisible ? 'password' : 'text'} />

      <button
        type="button"
        className={cn('password__toggle', { active: !isPasswordVisible })}
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        aria-label={isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'}
      >
        <ShowPasswordUnchecked className="password__icon" />
      </button>
    </label>
  );
};
