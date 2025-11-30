'use client';

import { type FC, Fragment } from 'react';

import cn from 'classnames';

import type { Product } from '@/modules/products/types/Product';
import { ProductCard } from '@/modules/products/ui/product-card/product-card';

import './product-list.scss';

type Props = {
  products: Product[];
  variant?: string;
};

export const ProductsList: FC<Props> = ({ products, variant }) => (
  <div
    className={cn({
      ['products-list']: variant === 'home',
      ['catalog-list']: variant === 'catalog',
    })}
  >
    {products.map((product) => (
      <Fragment key={product.product_id}>
        <ProductCard product={product} variant={variant} />
      </Fragment>
    ))}
  </div>
);
