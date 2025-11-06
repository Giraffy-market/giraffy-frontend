import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import type { LoginFormValues } from '../types/types.ts';

export const useLoginForm = (): {
  register: ReturnType<typeof useForm<LoginFormValues>>['register'];
  handleSubmit: ReturnType<typeof useForm<LoginFormValues>>['handleSubmit'];
  watch: ReturnType<typeof useForm<LoginFormValues>>['watch'];
  setValue: ReturnType<typeof useForm<LoginFormValues>>['setValue'];
} => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailFromUrl = searchParams.get('email') ?? '';

  const { register, handleSubmit, watch, setValue } = useForm<LoginFormValues>({
    defaultValues: {
      email: emailFromUrl,
      password: '',
    },
  });

  useEffect(() => {
    if (emailFromUrl) setValue('email', emailFromUrl);
  }, [emailFromUrl, setValue]);

  const emailValue = watch('email');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (emailValue) {
      url.searchParams.set('email', emailValue);
    } else {
      url.searchParams.delete('email');
    }
    router.replace(url.pathname + url.search);
  }, [emailValue, router]);

  return {
    register,
    handleSubmit,
    watch,
    setValue,
  };
};
