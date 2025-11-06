'use client';

import { type FC } from 'react';
import { type SubmitHandler } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/ui/button/Button';
import { CheckBox } from '@/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput } from '@/ui/inputs';

import type { LoginFormValues } from './types/types';

import './styles/LoginForm.scss';

import { useLoginForm } from './model/useLoginForm';

export const LoginForm: FC = () => {
  const { register, handleSubmit } = useLoginForm();
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
            <label className="login-label" htmlFor="email">
              Електронна пошта
            </label>
            <BaseInput
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
          </div>
          <div className="login-input--wrapper">
            <PasswordInput
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
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
          <Link className="login-register--link" href="/">
            Зареєструватися
          </Link>
        </p>
      </form>
    </div>
  );
};
