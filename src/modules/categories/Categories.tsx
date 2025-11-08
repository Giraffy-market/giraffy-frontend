'use client';

import { type FC } from 'react';

import CategoriesList from './ui/CategoriesList';
import Error from '@/ui/error/Error';
import GiraffeEating from '@/ui/error/assets/giraffe-eating.svg';
import { Loader } from '@/ui/loader/Loader';
import SectionTitle from '@/ui/sectionTitle/SectionTitle';

import { useFetchCategories } from './api/fetchCategories';

const Categories: FC = () => {
  const { isLoading, error, data, refetch } = useFetchCategories();

  if (isLoading) return <Loader />;

  if (error || !data) {
    return (
      <Error
        Icon={GiraffeEating}
        title={['Упс!', 'Щось пішло не так']}
        description="Схоже, виникла неочікувана помилка. Ми вже знаємо про це й працюємо над виправленням"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="container">
      <SectionTitle title="Тебе зацікавлять" />
      <CategoriesList data={data} />
    </div>
  );
};

export default Categories;
