'use client';

import { type FC, useEffect, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useQueryState } from 'nuqs';

// import { useModalManager } from '@/components/common/UseModalManager';
import { Button } from '@/components/ui/button/Button';
import { OtpInput } from '@/components/ui/inputs';

import type { VerifyFormValues } from './types/types';

import './styles/VerifyCode.scss';

import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
} from '../../constants/modal-constants';
import { useResendCode } from '../../hooks/useResendCode';
import { useVerify } from '../../hooks/useVerify';

export const VerifyCode: FC = () => {
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const [email, setEmail] = useQueryState('email');
  const [seconds, setSeconds] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const { control, handleSubmit, reset, watch, setError } =
    useForm<VerifyFormValues>({
      defaultValues: {
        kod: '',
      },
    });

  const resendMutation = useResendCode(() => {
    setSeconds(60);
    setCanResend(false);
  });
  const verifyMutation = useVerify(setError);
  // const [otp, setOtp] = useState('');
  const kodValue = watch('kod');
  const isOtpComplete = kodValue.length === 4;

  useEffect(() => {
    if (seconds <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = async () => {
    if (!canResend || !email) {
      console.warn('Resend blocked: email is missing or timer not finished');
      return;
    }
    if (!canResend || !email) return;
    resendMutation.mutate({ email });
  };

  const onSubmit: SubmitHandler<VerifyFormValues> = async (data) => {
    if (!email) return toast.error('Email відсутній');

    verifyMutation.mutate(
      {
        email: email,
        kod: data.kod,
      },
      {
        onSuccess: () => {
          toast.success('Код підтверджено!');
          setModal(LOGIN_FORM_MODAL_KEY);
          reset();
        },
      },
    );
  };

  return (
    <>
      <form className="verify-form" onSubmit={handleSubmit(onSubmit)}>
        <p className="verify-text">
          Код надійде на вашу пошту <strong>{email || 'вашу пошту'}</strong>
        </p>
        <div className="register-input--wrapper">
          <Controller
            name="kod"
            control={control}
            // prettier-ignore
            rules={{ required: 'Поле обов\'язкове для заповнення' }}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <OtpInput {...field} isInvalid={!!error} />
                </>
              );
            }}
          />
        </div>
        <Button
          text="Продовжити"
          variant="gradient"
          type="submit"
          disabled={verifyMutation.isPending}
        />
      </form>
      <div className="verify-bottom">
        <Button
          text={
            canResend
              ? 'Надіслати код повторно'
              : `Надіслати код повторно (${seconds})`
          }
          type="button"
          variant="ghost"
          disabled={!canResend || resendMutation.isPending}
          onClick={handleResend}
        />
        <p className="verify-desc">
          Код, що відправлений у листі, діє 2 години
        </p>
      </div>
    </>
  );
};
