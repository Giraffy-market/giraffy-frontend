import { type FC } from 'react';

import Link from 'next/link';

import { categoryIcons } from '../constants/constants';
import { CategoryItem } from '../types/CategoryItem';

export type Props = {
  data: CategoryItem;
  index: number;
};

const CategoriesItem: FC<Props> = ({ data, index }) => {
  const Icon = categoryIcons[index];

  return (
    <li className="categories-item">
      <Link className="categories-item-link" href="/">
        <div className="categories-item-image-wrapper">
          <Icon role="img" aria-label={data.name} />
        </div>
        <h3 className="categories-item-subtitle">{data.name}</h3>
      </Link>
    </li>
  );
};

export default CategoriesItem;
