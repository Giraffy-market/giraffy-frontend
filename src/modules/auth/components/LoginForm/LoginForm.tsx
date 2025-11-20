'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signIn } from 'next-auth/react';
import { useQueryState } from 'nuqs';

import { Button } from '@/ui/button/Button';
import { CheckBox } from '@/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput } from '@/ui/inputs';

import type { LoginFormValues } from './types/types';

import './styles/LoginForm.scss';

import { MODAL_QUERY_STATE, REGISTER_FORM_MODAL_KEY } from '../../constants';

export const LoginForm: FC = () => {
  const { control, handleSubmit, reset } = useForm<LoginFormValues>();
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result && !result?.ok && result.error) {
      toast.error(result.error);
      return;
    }

    reset();
    setModal(null);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="login-inputs--wrapper">
        <div className="login-input--wrapper">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <BaseInput
                {...field}
                type="email"
                placeholder="example@mail.com"
                labelText="Електронна пошта"
                id="email"
              />
            )}
          />
        </div>
        <div className="login-input--wrapper">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="Введіть пароль"
                labelText="Пароль "
                id="password"
              />
            )}
          />
        </div>
      </div>
      <div className="login-actions">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <CheckBox
              {...field}
              labelText="Запам’ятати мене"
              labelProps={{
                className: 'login-actions--checkbox',
              }}
            />
          )}
        />

        <span className="login-actions--forget">Забули пароль?</span>
      </div>

      <Button text="Увійти" variant="gradient" type="submit" />

      <span className="login-or">Або</span>
      <p className="login-register">
        Вперше тут?&nbsp;
        <button
          className="login-register--link"
          type="button"
          onClick={() => setModal(REGISTER_FORM_MODAL_KEY)}
        >
          Зареєструватися
        </button>
      </p>
    </form>
  );
};
