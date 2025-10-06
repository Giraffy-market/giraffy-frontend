'use client';

import { type FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import Error from '@/ui/error/Error';
import { getErrorType } from '@/ui/error/utils/getErrorType';

import './styles/list.scss';

import { fetchCategories } from './api/fetchCategories';
import { CategoryItem } from './types/CategoryItem';
import CategoriesItem from './ui/CategoriesItem';

const CategoriesList: FC = () => {
  const { data, error } = useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (error || !data) {
    const type = getErrorType(error);
    return <Error type={type} />;
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
