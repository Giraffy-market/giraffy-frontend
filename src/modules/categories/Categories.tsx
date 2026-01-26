'use client';

import { type FC } from 'react';

import { useFetchCategories } from '@/modules/categories/api/useFetchCategories';

import { Loader } from '@/components/ui/loader/Loader';
import LoadingErrorPage from '@/components/ui/loadingErrorPage/LoadingErrorPage';
import GiraffeEating from '@/components/ui/loadingErrorPage/assets/giraffe-eating.svg';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

import CategoriesList from './ui/CategoriesList';

const Categories: FC = () => {
  const { isLoading, error, data, refetch } = useFetchCategories();

  if (isLoading) return <Loader />;

  if (error || !data) {
    return (
      <LoadingErrorPage
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
