import { type FC } from 'react';

import Link from 'next/link';

import '../styles/list.scss';

import { categoryIcons } from '../constants/constants';
import { CategoryItemProps } from '../types';

export interface Props {
  data: CategoryItemProps;
  index: number;
}

const CategoriesItem: FC<Props> = ({ data, index }) => {
  const Icon = categoryIcons[index];

  return (
    <li className="item">
      <Link className="link" href="/">
        <div className="image-wrapper">
          <Icon role="img" aria-label={data?.name} />
        </div>
        <h3 className="subtitle">{data?.name}</h3>
      </Link>
    </li>
  );
};

export default CategoriesItem;
