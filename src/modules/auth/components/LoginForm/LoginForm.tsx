'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

import type { ModalType } from '@/components/common/UseModalManager/hooks/useModalManager';
import { Button } from '@/components/ui/button/Button';
import { CheckBox } from '@/components/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput } from '@/components/ui/inputs';

import type { LoginFormValues } from './types/types';

import './styles/LoginForm.scss';

import {
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
} from '../../constants/modal-constants';
import { useLogin } from '../../hooks/useLogin';

interface LoginFormProps {
  onShowStatus?: (type: ModalType) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onShowStatus }) => {
  const router = useRouter();
  const { control, handleSubmit, reset, setError } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const { mutate, isPending } = useLogin(setError);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    mutate(data, {
      onSuccess: async () => {
        reset();

        router.refresh();
        await setModal(null);
        onShowStatus?.('welcome');
      },
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="login-inputs--wrapper">
        <div className="login-input--wrapper">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => (
              <BaseInput
                {...field}
                type="email"
                placeholder="example@mail.com"
                labelText="Електронна пошта"
                id="email"
                error={error?.message}
                isInvalid={!!error}
              />
            )}
          />
        </div>
        <div className="login-input--wrapper">
          <Controller
            name="password"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                placeholder="Введіть пароль"
                labelText="Пароль "
                id="password"
                error={error?.message}
                isInvalid={!!error}
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

      <Button
        text={isPending ? 'Вхід...' : 'Увійти'}
        variant="gradient"
        type="submit"
        disabled={isPending}
      />

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
