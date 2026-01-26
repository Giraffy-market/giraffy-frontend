import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button/Button';
import { BaseInput } from '@/components/ui/inputs';
import { TextInput } from '@/components/ui/inputs/TextInput/TextInput';

import { useCreateTicket } from './api/useCreateTicket';

import { type CreateTicketFormValues } from './types/types';

import './styles/CreateTicketForm.scss';

const CreateTicketForm = () => {
  const { control, handleSubmit, reset } = useForm<CreateTicketFormValues>({
    defaultValues: {
      user_name: '',
      user_email: '',
      title: '',
      description: '',
    },
  });

  const { mutate, isPending, isError, error } = useCreateTicket(() => {
    alert('Повідомлення успішно відправлено!');
    reset();
  });

  const onSubmit = (data: CreateTicketFormValues) => {
    mutate(data);
  };
  return (
    <section className="create-ticket">
      <div>
        <p style={{ maxWidth: '420px' }}>
          Напиши нам — і ми все вирішимо разом
        </p>
      </div>
      <form className="ticket-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="ticket-inputs--wrapper">
          <div className="ticket-input--wrapper-base">
            <Controller
              name="user_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <BaseInput
                  {...field}
                  type="name"
                  placeholder="Введіть ім’я"
                  labelText="Ім'я"
                  id="user_name"
                />
              )}
            />
          </div>
          <div className="ticket-input--wrapper-base">
            <Controller
              name="user_email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <BaseInput
                  {...field}
                  type="email"
                  placeholder="example@mail.com"
                  labelText="Електронна пошта"
                  id="user_email"
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
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Опишить ваше питання або проблему..."
                  labelText="Опис"
                  id="description"
                  style={{ minHeight: '108px' }}
                />
              )}
            />
          </div>
        </div>
        <Button
          text={isPending ? 'Відправка...' : 'Відправити'}
          variant="gradient"
          type="submit"
          disabled={isPending}
          style={{ marginTop: '40px' }}
        />
      </form>
    </section>
  );
};

export default CreateTicketForm;
