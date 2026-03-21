'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

import { useQueryClient } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

import type { ModalType } from '@/components/common/UseModalManager/hooks/useModalManager';
import { Button } from '@/components/ui/button/Button';
import { CheckBox } from '@/components/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput } from '@/components/ui/inputs';

import type { LoginFormValues } from './types/types';

import type { HttpError } from '@/shared/api/errors/http-error';

import './styles/LoginForm.scss';

import { handleGoogleLoginAction } from '../../api/handleGoogleLoginAction';
import {
  FORGOT_PASSWORD_MODAL_KEY,
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
  VERIFY_FORM_MODAL_KEY,
  VerifyAction,
} from '../../constants/modal-constants';
import { useLogin } from '../../hooks/useLogin';
import { useAuthTempStore } from '../../store/useAuthTempStore';

interface LoginFormProps {
  onShowStatus?: (type: ModalType) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onShowStatus }) => {
  const setPassword = useAuthTempStore((state) => state.setPassword);
  const [, setEmailQuery] = useQueryState('email');
  const [, setVerifyAction] = useQueryState('verifyAction');
  const queryClient = useQueryClient();
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

  const onGoogleClick = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      toast.error('Помилка авторизації');
    }
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        reset();

        router.refresh();
        await setModal(null);
      },
      onError: (error) => {
        const httpError = error as HttpError;
        console.log('Full error message:', httpError.message);

        const errorMessage = httpError.message || '';
        const lowerMessage = errorMessage.toLowerCase();

        if (lowerMessage.includes('не підтверджено')) {
          setPassword(data.password);

          const proceedToVerify = async () => {
            await setEmailQuery(data.email);
            await setVerifyAction(VerifyAction.REGISTER);

            setModal(VERIFY_FORM_MODAL_KEY);
          };

          proceedToVerify();
          toast.info('Будь ласка, підтвердіть вашу пошту');
        }
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

        <button
          className="login-actions--forget"
          onClick={() => setModal(FORGOT_PASSWORD_MODAL_KEY)}
        >
          Забули пароль?
        </button>
      </div>

      <Button
        text={isPending ? 'Вхід...' : 'Увійти'}
        variant="gradient"
        type="submit"
        disabled={isPending}
      />
      <p
        className="register-login"
        style={{
          margin: '16px auto 8px',
        }}
      >
        Або
      </p>

      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        onClick={onGoogleClick}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            height: '80px',
          }}
        >
          <FcGoogle size={56} />
          <span>Продовжити з Google</span>
        </div>
      </Button>

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
