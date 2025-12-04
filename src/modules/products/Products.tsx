'use client';

import { type FC } from 'react';

import { useFetchProducts } from '@/modules/products/api/useFetchProducts';
import { ProductsList } from '@/modules/products/components/products-list';

import { CustomPagination } from '@/ui/CustomPagination/CustomPagination';
import { Loader } from '@/ui/loader/Loader';
import SectionTitle from '@/ui/sectionTitle/SectionTitle';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

type ProductsProps = {
  showTitle?: boolean;
  variant: 'home' | 'catalog';
};

export const Products: FC<ProductsProps> = ({ showTitle = true, variant }) => {
  const { data, isLoading, error } = useFetchProducts();

  if (isLoading) return <Loader />;
  if (error || !data)
    return <ToastMessage message={error?.detail} type="error" />;

  return (
    <div className="container">
      {showTitle && <SectionTitle title="Для тебе" />}
      <ProductsList products={data.items} variant={variant} />
      <CustomPagination size={data.size} />
    </div>
  );
};
