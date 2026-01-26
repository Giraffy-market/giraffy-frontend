import { type FC } from 'react';

import type { CategoryItem } from '../types/CategoryItem';

import '../styles/list.scss';

import CategoriesItem from './CategoriesItem';

const CategoriesList: FC<{ data: CategoryItem[] }> = ({ data }) => {
  return (
    <ul className="categories-list">
      {data.map((category, i) => (
        <CategoriesItem key={category.category_id} data={category} index={i} />
      ))}
    </ul>
  );
};

export default CategoriesList;
