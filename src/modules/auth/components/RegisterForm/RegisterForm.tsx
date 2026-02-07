'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button/Button';
import { CheckBox } from '@/components/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput, PhoneInput } from '@/components/ui/inputs';

import type { RegisterFormValues } from './types/types';

import './styles/RegisterForm.scss';

import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
  VERIFY_FORM_MODAL_KEY,
} from '../../constants/modal-constants';
import { useRegister } from '../../hooks/useRegister';

export const RegisterForm: FC = () => {
  const { control, handleSubmit, reset, setError } =
    useForm<RegisterFormValues>({
      defaultValues: {
        email: '',
        phone_number: '',
        password: '',
        passwordConfirm: '',
      },
    });
  const { mutate, isPending } = useRegister(setError);
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const [, setEmail] = useQueryState('email');

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'Паролі не співпадають' });
      return;
    }

    mutate(
      {
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
      },
      {
        onSuccess: async () => {
          await setEmail(data.email);
          setModal(VERIFY_FORM_MODAL_KEY);
          reset();
        },
      },
    );
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="register-inputs--wrapper">
        <div className="register-input--wrapper">
          <Controller
            name="email"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => {
              return (
                <BaseInput
                  {...field}
                  type="email"
                  placeholder="example@mail.com"
                  labelText="Електронна пошта"
                  id="email"
                  error={error?.message}
                  isInvalid={!!error}
                />
              );
            }}
          />
        </div>
        <div className="register-input--wrapper">
          <Controller
            name="phone_number"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => (
              <PhoneInput
                {...field}
                labelText="Номер телефону"
                id="phone_number"
                mask="+{380} (00) 000 00 00"
                onAccept={(value) => field.onChange(value)}
                error={error?.message}
                isInvalid={!!error}
              />
            )}
          />
        </div>
        <div className="register-input--wrapper">
          <Controller
            name="password"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                placeholder="Введіть пароль"
                labelText="Пароль"
                id="password"
                error={error?.message}
                isInvalid={!!error}
              />
            )}
          />
        </div>
        <div className="register-input--wrapper">
          <Controller
            name="passwordConfirm"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                placeholder="Повторіть пароль"
                labelText="Підтвердження паролю"
                id="passwordConfirm"
                error={error?.message}
                isInvalid={!!error}
              />
            )}
          />
        </div>
      </div>
      <div className="register-checkboxes--wrapper">
        <div className="register-checkbox--wrapper">
          <Controller
            name="dataUseAgreement"
            control={control}
            render={({ field }) => (
              <CheckBox
                {...field}
                labelText={
                  <span>
                    Я даю згоду на обробку персональних данних та приймаю{' '}
                    <a href="/privacy" target="_blank">
                      Політику конфіденційності
                    </a>{' '}
                    і{' '}
                    <a href="/legal-terms" target="_blank">
                      Умови надання послуг
                    </a>
                  </span>
                }
                labelProps={{
                  className: 'register-checkbox--item',
                }}
              />
            )}
          />
        </div>
        <div className="register-checkbox--wrapper">
          <Controller
            name="dataUseAgreement"
            control={control}
            render={({ field }) => (
              <CheckBox
                {...field}
                labelText={
                  <span>
                    Я хочу отримувати новини та оновлення сервісу (Опційно)
                  </span>
                }
                labelProps={{
                  className: 'register-checkbox--item',
                }}
              />
            )}
          />
        </div>
      </div>

      <Button
        text={isPending ? 'Реєстрація...' : 'Зареєструватися'}
        variant="gradient"
        type="submit"
        disabled={isPending}
      />

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
