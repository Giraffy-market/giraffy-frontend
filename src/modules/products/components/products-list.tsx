'use client';

import { type FC, Fragment } from 'react';

import type { Product } from '@/modules/products/types/Product';
import { ProductCard } from '@/modules/products/ui/product-card/product-card';

import './product-list.scss';

type Props = {
  products: Product[];
};

export const ProductsList: FC<Props> = ({ products }) => (
  <div className="products-list">
    {products.map((product) => (
      <Fragment key={product.product_id}>
        <ProductCard product={product} />
      </Fragment>
    ))}
  </div>
);
