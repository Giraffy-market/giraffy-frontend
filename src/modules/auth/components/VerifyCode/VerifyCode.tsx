import { FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { VerifyCodeValues } from './types/types';

export const VerifyCodeForm: FC = () => {
  const { control, handleSubmit, reset, setError } = useForm<VerifyCodeValues>({
    defaultValues: {
      email: '',
      kod: '',
    },
  });
  const onSubmit: SubmitHandler<VerifyCodeValues> = async ({ email, kod }) => {
    try {
    } catch (error) {}
  };
  return (
    <form className="verify-form" onSubmit={handleSubmit(onSubmit)}></form>
  );
};
