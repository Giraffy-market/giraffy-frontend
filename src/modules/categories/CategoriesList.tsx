'use client';

import { type FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import './styles/list.scss';

import { fetchCategories } from './api/fetchCategories';
import { CategoryItemProps } from './types';
import CategoriesItem from './ui/CategoriesItem';

const CategoriesList: FC = () => {
  const { data, error } = useQuery<CategoryItemProps[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (error) {
    return <div>Something went wrong {(error as Error).message}</div>;
  }

  return (
    <ul className="list">
      {data?.map((category, i) => (
        <CategoriesItem key={category?.category_id} data={category} index={i} />
      ))}
    </ul>
  );
};

export default CategoriesList;
