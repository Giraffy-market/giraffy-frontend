'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button/Button';
import { CheckBox } from '@/components/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput, PhoneInput } from '@/components/ui/inputs';

import { ResetPasswordFormValues } from './types/types';

import './styles/ResetPasswordForm.scss';

import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
  VERIFY_ACTION_KEY,
  VerifyAction,
} from '../../constants/modal-constants';
import { useResetPassword } from '../../hooks/useResetPassword';

export const ResetPasswordForm: FC = () => {
  const { control, handleSubmit, reset, setError } =
    useForm<ResetPasswordFormValues>({
      defaultValues: {
        token: '',
        password: '',
        passwordConfirm: '',
      },
    });
  const { mutate, isPending } = useResetPassword(setError);
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const [, setEmail] = useQueryState('email');
  const [token, setToken] = useQueryState('token');
  const [, setVerifyAction] = useQueryState(VERIFY_ACTION_KEY);

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', { message: 'Паролі не співпадають' });
      return;
    }

    mutate(
      {
        token: data.token || token || '',
        password: data.password,
      },
      {
        onSuccess: async () => {
          await setToken(null);
          await setVerifyAction(VerifyAction.FORGOT_PASSWORD);
          setModal(LOGIN_FORM_MODAL_KEY);
          reset();
        },
      },
    );
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <p className="register-text">
        Створи надійний пароль, щоб захистити свій акаунт і данні.
      </p>
      <div className="register-inputs--wrapper">
        <div className="register-input--wrapper">
          <Controller
            name="password"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => (
              <PasswordInput
                {...field}
                placeholder="Придумайте новий пароль для входу"
                labelText="Новий пароль"
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
                placeholder="Введіть ще раз, щоб переконатися"
                labelText="Підтвердження паролю"
                id="passwordConfirm"
                error={error?.message}
                isInvalid={!!error}
              />
            )}
          />
        </div>
      </div>

      <Button
        text={isPending ? 'Збереження...' : 'Зберегти'}
        variant="gradient"
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};
