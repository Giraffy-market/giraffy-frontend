import { type FC } from 'react';

import '../styles/list.scss';

import { CategoryItem } from '../types/CategoryItem';
import CategoriesItem from './CategoriesItem';

const CategoriesList: FC<{ data: CategoryItem[] }> = ({ data }) => {
  return (
    <ul className="list">
      {data.map((category, i) => (
        <CategoriesItem key={category.category_id} data={category} index={i} />
      ))}
    </ul>
  );
};

export default CategoriesList;
