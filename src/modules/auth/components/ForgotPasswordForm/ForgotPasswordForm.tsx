'use client';

import { type FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useQueryState } from 'nuqs';

import { type ModalType } from '@/components/common/UseModalManager/hooks/useModalManager';
import { Button } from '@/components/ui/button/Button';
import { BaseInput } from '@/components/ui/inputs';

import { type ForgotPasswordFormValues } from './types/types';

import './styles/ForgotPasswordForm.scss';

import {
  MODAL_QUERY_STATE,
  // VERIFY_ACTION_KEY,
} from '../../constants/modal-constants';
import { useForgotPassword } from '../../hooks/useForgotPassword';

interface ForgotPasswordFormProps {
  onShowStatus?: (type: ModalType) => void;
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onShowStatus,
}) => {
  const { control, handleSubmit, setError } = useForm<ForgotPasswordFormValues>(
    {
      defaultValues: {
        email: '',
      },
    },
  );

  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  // const [, setEmail] = useQueryState('email');
  // const [, setVerifyAction] = useQueryState(VERIFY_ACTION_KEY);

  const { mutate, isPending } = useForgotPassword(setError);

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    mutate(data, {
      onSuccess: async () => {
        // await setEmail(data.email);
        // await setVerifyAction('forgot_password');
        // await setModal(VERIFY_FORM_MODAL_KEY);
        await setModal(null);
        onShowStatus?.('sendmessage');
      },
    });
  };

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit(onSubmit)}>
      <p className="forgot-password-text">
        Не хвилюйтеся! Введіть email — і ми надішлемо посилання для відновлення
        пароля
      </p>

      <div className="login-inputs--wrapper">
        <div className="login-input--wrapper">
          <Controller
            name="email"
            control={control}
            rules={{
              // prettier-ignore
              required: 'Поле обов\'язкове для заповнення',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Невірний формат пошти',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <BaseInput
                {...field}
                type="email"
                placeholder="example@mail.com"
                labelText=""
                id="email"
                error={error?.message}
                isInvalid={!!error}
              />
            )}
          />
        </div>
      </div>

      <Button
        text={'Відновити пароль'}
        variant="gradient"
        type="submit"
        disabled={isPending}
      />
      <p className="forgot-password-desc">
        Посилання для відновлення буде дійсним 15 хвилин
      </p>
    </form>
  );
};
