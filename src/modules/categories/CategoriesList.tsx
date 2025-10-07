'use client';

import { type FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import Error from '@/ui/error/Error';

import GiraffeEating from '../../ui/error/assets/giraffe-eating.svg';

import './styles/list.scss';

import { fetchCategories } from './api/fetchCategories';
import { CategoryItem } from './types/CategoryItem';
import CategoriesItem from './ui/CategoriesItem';

const CategoriesList: FC = () => {
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
    <ul className="list">
      {data.map((category, i) => (
        <CategoriesItem key={category.category_id} data={category} index={i} />
      ))}
    </ul>
  );
};

export default CategoriesList;
