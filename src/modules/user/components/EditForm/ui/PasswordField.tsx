import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  type UseFormWatch,
} from 'react-hook-form';

import { Button } from '@/components/ui/button/Button';
import { PasswordInput } from '@/components/ui/inputs';

import styles from '../styles/EditForm.module.scss';

interface PasswordFieldsProps<T extends FieldValues> {
  control: Control<T>;
  watch: UseFormWatch<T>;
  isPasswordValidated: boolean;
  isVerifying: boolean;
  onVerify: () => void;
}

export const PasswordFields = <T extends FieldValues>({
  control,
  watch,
  isPasswordValidated,
  isVerifying,
  onVerify,
}: PasswordFieldsProps<T>) => {
  const newPassword = watch('new_password' as Path<T>);
  const currentPassword = watch('current_password' as Path<T>);
  const confirmPassword = watch('confirm_password' as Path<T>);

  const isChangingPassword = !!(
    currentPassword ||
    newPassword ||
    confirmPassword
  );

  return (
    <div className={styles.passwordSection}>
      <h3 className={styles.title}>Зміна паролю</h3>

      <div className={styles.inputPassword}>
        <Controller
          name={'current_password' as Path<T>}
          control={control}
          rules={{
            required: isChangingPassword ? 'Введіть старий пароль' : false,
          }}
          render={({ field, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              labelText="Старий пароль"
              placeholder="Введіть пароль до вашого облікового запису"
              error={error?.message}
              isInvalid={!!error}
            />
          )}
        />
      </div>

      <div className={styles.inputPassword}>
        <Controller
          name={'new_password' as Path<T>}
          control={control}
          rules={{
            required: isChangingPassword ? 'Введіть новий пароль' : false,
            minLength: isChangingPassword
              ? { value: 6, message: 'Мінімум 6 символів' }
              : undefined,
            validate: (value) => {
              if (!isChangingPassword) return true;
              return (
                value !== currentPassword ||
                'Новий пароль не може збігатися зі старим'
              );
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              labelText="Новий пароль"
              placeholder="Придумайте новий пароль для входу"
              error={error?.message}
              isInvalid={!!error}
            />
          )}
        />
      </div>

      <div className={styles.inputPassword}>
        <Controller
          name={'confirm_password' as Path<T>}
          control={control}
          rules={{
            required: isChangingPassword ? 'Підтвердіть пароль' : false,
            validate: (value) => {
              if (!isChangingPassword) return true;
              return value === newPassword || 'Паролі не збігаються';
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              labelText="Повтор нового паролю"
              placeholder="Введіть ще раз, щоб переконатися"
              error={error?.message}
              isInvalid={!!error}
            />
          )}
        />
      </div>

      {isChangingPassword && (
        <div className={styles.confirmPasswordButton}>
          <Button
            type="button"
            text={
              isVerifying
                ? 'Зачекайте...'
                : isPasswordValidated
                  ? 'Пароль підтверджено ✓'
                  : 'Підтвердити зміну пароля'
            }
            variant="outline"
            onClick={onVerify}
            disabled={isPasswordValidated || isVerifying}
          />
        </div>
      )}
    </div>
  );
};
