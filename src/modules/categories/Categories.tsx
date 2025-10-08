'use client';

import { type FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import CategoriesList from './ui/CategoriesList';
import Error from '@/ui/error/Error';
import GiraffeEating from '@/ui/error/assets/giraffe-eating.svg';
import SectionTitle from '@/ui/sectionTitle/SectionTitle';

import { fetchCategories } from './api/fetchCategories';

import type { CategoryItem } from './types/CategoryItem';

const Categories: FC = () => {
  const { data, error, refetch } = useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (error || !data) {
    return (
      <Error
        Icon={GiraffeEating}
        title={['Упс!', 'Щось пішло не так']}
        description="Схоже, виникла неочікувана помилка. Ми вже знаємо про це й працюємо над виправленням"
        refetch={refetch}
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
