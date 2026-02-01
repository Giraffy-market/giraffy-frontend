'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
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

interface ApiError {
  detail?: string | Array<{ msg: string; loc: Array<string | number> }>;
  message?: string;
}

export const RegisterForm: FC = () => {
  const router = useRouter();
  const { control, handleSubmit, reset, setError } =
    useForm<RegisterFormValues>({
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
        setError('passwordConfirm', {
          type: 'manual',
          message: 'Паролі не співпадають',
        });

        return;
      }

      const result = await handleRegister({
        email,
        phone_number,
        password,
      });

      console.log(result);

      toast.success('Реєстрація успішна!');

      reset();
      setModal(null);
      router.push('/');
    } catch (error) {
      const serverError = error as ApiError;
      const detail = serverError?.detail || serverError?.message || error;

      if (detail) {
        let isHandled = false;

        if (Array.isArray(detail)) {
          const passwordMessages = detail
            .filter((err) => {
              const m = typeof err === 'string' ? err : err.msg;
              return m.toLowerCase().includes('пароль');
            })
            .map((err) => (typeof err === 'string' ? err : err.msg));

          if (passwordMessages.length > 0) {
            setError('password', {
              type: 'server',
              message: passwordMessages.join('\n'),
            });
            isHandled = true;
          }

          detail.forEach((err) => {
            const msg = typeof err === 'string' ? err : err.msg;
            const lowerMsg = msg.toLowerCase();

            if (lowerMsg.includes('mail')) {
              setError('email', { type: 'server', message: msg });
              isHandled = true;
            } else if (
              lowerMsg.includes('phone') ||
              lowerMsg.includes('номер')
            ) {
              setError('phone_number', { type: 'server', message: msg });
              isHandled = true;
            }
          });
        } else if (typeof detail === 'string') {
          const cleanMessage = detail.trim();
          const lowerDetail = cleanMessage.toLowerCase();

          if (lowerDetail.includes('mail')) {
            setError('email', { type: 'server', message: cleanMessage });
            isHandled = true;
          }
          if (lowerDetail.includes('phone') || lowerDetail.includes('номер')) {
            setError('phone_number', { type: 'server', message: cleanMessage });
            isHandled = true;
          }
          if (lowerDetail.includes('пароль')) {
            setError('password', { type: 'server', message: cleanMessage });
            isHandled = true;
          }

          if (!isHandled) {
            toast.error(cleanMessage);
          }
        }

        if (!isHandled) {
          toast.error(
            typeof detail === 'string'
              ? detail
              : 'Сталася помилка при реєстрації',
          );
        }
      }
    }
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
