import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import cn from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button/Button';
import { BaseInput, PhoneInput } from '@/components/ui/inputs';
import { TextInput } from '@/components/ui/inputs/TextInput/TextInput';

import { PasswordFields } from './ui/PasswordField';

import { endpoints } from '@/shared/api/constants/endpoints';
import type { UpdateUserRequest, User } from '@/shared/types';

import styles from './styles/EditForm.module.scss';

import { handleUpdateAvatar } from '../../api/handleUpdateAvatar';
import defaultAvatar from '../../assets/defaultAvatar.png';
import ImageIcon from '../../assets/img.svg';
import TrashIcon from '../../assets/trash.svg';
import { useUpdateAvatar } from '../../hooks/useUpdateAvatar';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useVerifyPassword } from '../../hooks/useVerifyPassword';

interface FormInput {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location: string;
  description: string;
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

const MAIN_FIELDS = [
  // prettier-ignore
  { name: 'first_name', label: 'Ім\'я', placeholder: 'Введіть ім\'я' },
  { name: 'last_name', label: 'Прізвище', placeholder: 'Введіть прізвище' },
  {
    name: 'email',
    label: 'Електронна пошта',
    placeholder: 'example@mail.com',
    disabled: true,
  },
  { name: 'phone_number', label: 'Номер телефону', disabled: true },
];

interface UserDataProps {
  user: User;
}

export const EditForm = ({ user }: UserDataProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentAvatar, setCurrentAvatar] = useState(
    user.avatar_url || defaultAvatar,
  );
  const { mutate: update, isPending } = useUpdateUser();
  const {
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      location: '',
      description: '',
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });
  const { mutate: updateAvatar, isPending: isAvatarLoading } =
    useUpdateAvatar();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const { data: session } = useSession();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Файл занадто великий (макс. 5мб)');
      return;
    }

    updateAvatar(file, {
      onSuccess: (data) => {
        const newUrl = data.avatar_url || data.url;
        if (newUrl) setCurrentAvatar(newUrl);

        if (fileInputRef.current) fileInputRef.current.value = '';
      },
    });
  };

  const { isPasswordValidated, isVerifying, handleVerifyPassword } =
    useVerifyPassword({
      watch,
      trigger,
      email: user.email,
    });

  const onSubmit = (formData: FormInput) => {
    const payload: UpdateUserRequest = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.first_name,
    };

    if (isPasswordValidated && formData.new_password) {
      payload.password = formData.new_password;
    }
    update(payload, {
      onSuccess: () => {
        toast.success('Зміни збережено');

        router.push('/profile/me');
      },
    });
  };
  return (
    <div className={styles.editFormWrapper}>
      <h3 className={styles.title}>Особиста інформація</h3>
      <div className={styles.top}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
        />
        <div className={styles.avatar}>
          <Image
            src={currentAvatar || defaultAvatar}
            alt="Аватар користувача"
            width={100}
            height={100}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.buttons}>
          <div
            className={cn(styles.item, isAvatarLoading && styles.disabled)}
            onClick={handleUploadClick}
          >
            <ImageIcon />
            <p>{isAvatarLoading ? 'Завантаження...' : 'Завантажити'}</p>
          </div>
          <div
            className={styles.item}
            onClick={() => setCurrentAvatar(defaultAvatar)}
          >
            <TrashIcon />
            <p>Видалити</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputWrapper}>
          {MAIN_FIELDS.map((field) => (
            <div
              key={field.name as keyof FormInput}
              className="ticket-input--wrapper-base"
            >
              <Controller
                name={field.name as keyof FormInput}
                control={control}
                render={({ field: f, fieldState: { error } }) => {
                  const InputComponent =
                    field.name === 'phone_number' ? PhoneInput : BaseInput;
                  return (
                    <InputComponent
                      {...f}
                      disabled={field.disabled}
                      placeholder={field.placeholder}
                      labelText={field.label}
                      error={error?.message}
                      isInvalid={!!error}
                    />
                  );
                }}
              />
            </div>
          ))}

          <div className="ticket-input--wrapper">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              // prettier-ignore

              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  placeholder="Напишіть інформацію про себе..."
                  labelText="Про себе"
                  id="description"
                  style={{ minHeight: '108px' }}
                  error={error?.message}
                  isInvalid={!!error}
                />
              )}
            />
          </div>
          <div className="ticket-input--wrapper-base">
            <Controller
              name="location"
              control={control}
              defaultValue=""
              // prettier-ignore

              render={({ field, fieldState: { error } }) => (
                <BaseInput
                  {...field}
                  type="name"
                  placeholder="Вкажіть ваше місце знаходження"
                  labelText="Локація"
                  id="location"
                  error={error?.message}
                  isInvalid={!!error}
                />
              )}
            />
          </div>
          <PasswordFields
            control={control}
            watch={watch}
            isPasswordValidated={isPasswordValidated}
            isVerifying={isVerifying}
            onVerify={handleVerifyPassword}
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            type="button"
            text="Скасувати"
            variant="outline"
            onClick={() => router.push('/profile/me')}
          />
          <Button
            type="submit"
            text={isPending ? 'Збереження...' : 'Зберегти'}
            variant="primary"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
};
