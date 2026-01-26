'use client';

import { type FC } from 'react';

import { useFetchProducts } from '@/modules/products/api/useFetchProducts';
import { ProductsList } from '@/modules/products/components/products-list';

import { Loader } from '@/components/ui/loader/Loader';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';
import { ToastMessage } from '@/components/ui/toastMessage/toastMessages';

export const Products: FC = () => {
  const { data, isLoading, error } = useFetchProducts();

  if (isLoading) return <Loader />;
  if (error || !data)
    return <ToastMessage message={error?.detail} type="error" />;

  return (
    <div className="container">
      <SectionTitle title="Для тебе" />
      <ProductsList products={data.items} />
    </div>
  );
};
