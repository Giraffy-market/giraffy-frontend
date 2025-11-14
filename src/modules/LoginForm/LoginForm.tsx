'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import { useQueryState } from 'nuqs';

import { Button } from '@/ui/button/Button';
import { CheckBox } from '@/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput } from '@/ui/inputs';

import type { LoginFormValues } from './types/types';

import './styles/LoginForm.scss';

import { switchModal } from './utils/switchModal';

export const LoginForm: FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();
  const [, setModal] = useQueryState('modal');

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    try {
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-title">Вхiд</h2>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-inputs--wrapper">
          <div className="login-input--wrapper">
            <Controller
              render={({ field }) => (
                <BaseInput
                  {...field}
                  type="email"
                  placeholder="example@mail.com"
                  labelText="Електронна пошта"
                  id="email"
                />
              )}
              name="email"
              control={control}
            />
          </div>
          <div className="login-input--wrapper">
            <Controller
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder="Введіть пароль"
                  labelText="Пароль "
                  id="password"
                />
              )}
              name="password"
              control={control}
            />
          </div>
        </div>
        <div className="login-actions">
          <CheckBox labelText="Запам’ятати мене" />

          <span className="login-actions--forget">Забули пароль?</span>
        </div>

        <Button text="Увійти" variant="gradient" />

        <span className="login-or">Або</span>
        <p className="login-register">
          Вперше тут?&nbsp;
          <button
            className="login-register--link"
            type="button"
            onClick={() => switchModal({ setModal, to: 'modal-register' })}
          >
            Зареєструватися
          </button>
        </p>
      </form>
    </div>
  );
};
