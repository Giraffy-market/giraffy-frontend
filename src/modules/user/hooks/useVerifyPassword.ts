import { useEffect, useState } from 'react';
import type {
  FieldValues,
  Path,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

interface UseVerifyPasswordProps<T extends FieldValues> {
  watch: UseFormWatch<T>;
  trigger: UseFormTrigger<T>;
  email: string;
}

export const useVerifyPassword = <T extends FieldValues>({
  watch,
  trigger,
  email,
}: UseVerifyPasswordProps<T>) => {
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        name === 'current_password' ||
        name === 'new_password' ||
        name === 'confirm_password'
      ) {
        setIsPasswordValidated(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleVerifyPassword = async () => {
    const isValid = await trigger([
      'current_password' as Path<T>,
      'new_password' as Path<T>,
      'confirm_password' as Path<T>,
    ]);
    const currentPwd = watch('current_password' as Path<T>);

    if (!isValid || !currentPwd) return;

    setIsVerifying(true);
    try {
      await customFetch(endpoints.auth.login, '', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: currentPwd,
        }),
      });

      setIsPasswordValidated(true);
      toast.success('Старий пароль підтверджено!');
    } catch (error: unknown) {
      setIsPasswordValidated(false);

      const err = error as { status?: number; message?: string };

      if (err.status === 401 || err.status === 400) {
        toast.error('Старий пароль невірний. Спробуйте ще раз.');
      } else if (err.status === 404) {
        toast.error('Помилка 404: Перевірте шлях до API');
      } else {
        toast.error('Старий пароль не підтверджен');
      }
      console.warn('Verification failed, but handled:', err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    isPasswordValidated,
    isVerifying,
    handleVerifyPassword,
  };
};
