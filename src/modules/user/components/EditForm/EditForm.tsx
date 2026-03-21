import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';

import { Button } from '@/components/ui/button/Button';
import { BaseInput } from '@/components/ui/inputs';
import { TextInput } from '@/components/ui/inputs/TextInput/TextInput';

import type { User } from '@/shared/types';

import styles from './styles/EditForm.module.scss';

import defaultAvatar from '../../assets/defaultAvatar.png';
import ImageIcon from '../../assets/img.svg';
import TrashIcon from '../../assets/trash.svg';

interface UserDataProps {
  user: User;
}

export const EditForm = ({ user }: UserDataProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      user_name: user.first_name || '',
      user_email: user.email || '',
      title: '',
      description: '',
    },
  });
  return (
    <div className={styles.editFormWrapper}>
      <h3 className={styles.title}>Особиста інформація</h3>
      <div className={styles.top}>
        <div className={styles.avatar}>
          <Image
            src={user.avatar_url || defaultAvatar}
            alt="Аватар користувача"
            width={100}
            height={100}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.item}>
            <ImageIcon />
            <p>Завантажити</p>
          </div>
          <div className={styles.item}>
            <TrashIcon />
            <p>Видалили</p>
          </div>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <div className="ticket-input--wrapper-base">
            <Controller
              name="user_name"
              control={control}
              defaultValue=""
              // prettier-ignore
              rules={{ required: 'Поле обов\'язкове для заповнення' }}
              render={({ field, fieldState: { error } }) => (
                <BaseInput
                  {...field}
                  type="name"
                  placeholder="Введіть ім’я"
                  labelText="Ім'я"
                  id="user_name"
                  error={error?.message}
                  isInvalid={!!error}
                />
              )}
            />
          </div>
          <div className="ticket-input--wrapper-base">
            <Controller
              name="user_email"
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
                  id="user_email"
                  error={error?.message}
                  isInvalid={!!error}
                />
              )}
            />
          </div>
          <div className="ticket-input--wrapper-base">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <BaseInput
                  {...field}
                  type="text"
                  placeholder="Вкажіть тему звернення"
                  labelText="Тема"
                  id="title"
                />
              )}
            />
          </div>
          <div className="ticket-input--wrapper">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              // prettier-ignore
              rules={{ required: 'Поле обов\'язкове для заповнення' }}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  placeholder="Опишить ваше питання або проблему..."
                  labelText="Опис"
                  id="description"
                  style={{ minHeight: '108px' }}
                  error={error?.message}
                  isInvalid={!!error}
                />
              )}
            />
          </div>
        </div>
        <Button
          // text={isPending ? 'Відправка...' : 'Відправити'}
          variant="gradient"
          type="submit"
          // disabled={isPending}
          style={{ marginTop: '40px' }}
        />
      </form>
    </div>
  );
};
