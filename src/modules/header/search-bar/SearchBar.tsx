'use client';

import { Controller, useForm } from 'react-hook-form';

import SearchIcon from '@/components/header/assets/search.svg';

import { BaseInput } from '@/ui/inputs/baseInput/BaseInput';

import styles from './styles/SearchBar.module.scss';

export const SearchBar = () => {
  const { control, handleSubmit, resetField } = useForm({
    defaultValues: { query: '' },
  });

  const onSubmit = ({ query }: { query: string }) => {
    console.log('Шукаємо:', query);
    resetField('query');
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <BaseInput id="search" Icon={SearchIcon} {...field} />
          )}
        />
      </div>

      <button type="submit" className={styles.searchBtn}>
        Знайти
      </button>
    </form>
  );
};
