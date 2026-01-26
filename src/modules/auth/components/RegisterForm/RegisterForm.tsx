'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button/Button';
import { CheckBox } from '@/components/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput, PhoneInput } from '@/components/ui/inputs';

import type { RegisterFormValues } from './types/types';

import './styles/RegisterForm.scss';

import { handleRegister } from '../../api/handleRegister';
import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
} from '../../constants/modal-constants';

export const RegisterForm: FC = () => {
  const { control, handleSubmit, reset } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      phone_number: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);

  const onSubmit: SubmitHandler<RegisterFormValues> = async ({
    email,
    phone_number,
    password,
    passwordConfirm,
  }) => {
    try {
      if (password !== passwordConfirm) {
        toast.error('Паролі не співпадають');
        return;
      }

      const result = await handleRegister({
        email,
        phone_number,
        password,
      });

      console.log(result);

      reset();
      setModal(null);
    } catch (error) {
      // TODO: There is a discussion
      console.log(error);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="register-inputs--wrapper">
        <div className="register-input--wrapper">
          <Controller
            name="email"
            control={control}
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
        <div className="register-input--wrapper">
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                labelText="Номер телефону"
                id="phone_number"
                mask="+{380} (00) 000 00 00"
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <div className="register-input--wrapper">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="Введіть пароль"
                labelText="Пароль"
                id="password"
              />
            )}
          />
        </div>
        <div className="register-input--wrapper">
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="Повторіть пароль"
                labelText="Підтвердження паролю"
                id="passwordConfirm"
              />
            )}
          />
        </div>
      </div>
      <div className="register-actions">
        <Controller
          name="dataUseAgreement"
          control={control}
          render={({ field }) => (
            <CheckBox
              {...field}
              labelText="Я даю згоду на обробку персональних данних"
              labelProps={{
                className: 'register-actions--checkbox',
              }}
            />
          )}
        />
      </div>

      <Button text="Зареєструватися" variant="gradient" type="submit" />

      <p className="register-login">
        Вже є аккаунт?&nbsp;
        <button
          className="register-login--link"
          type="button"
          onClick={() => setModal(LOGIN_FORM_MODAL_KEY)}
        >
          Увійти
        </button>
      </p>
    </form>
  );
};
