'use client';

import { type FC } from 'react';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { useFetchProducts } from '@/modules/products/api/useFetchProducts';
import { ProductsList } from '@/modules/products/components/products-list';

import { CustomPagination } from '@/ui/CustomPagination/CustomPagination';
import { Loader } from '@/ui/loader/Loader';
import SectionTitle from '@/ui/sectionTitle/SectionTitle';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

type ProductsProps = {
  showTitle?: boolean;
  variant?: string;
};

export const Products: FC<ProductsProps> = ({
  showTitle = true,
  variant = 'home',
}) => {
  const { data, isLoading, error } = useFetchProducts();
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
  });

  if (isLoading) return <Loader />;
  if (error || !data)
    return <ToastMessage message={error?.detail} type="error" />;

  return (
    <div className="container">
      {showTitle && <SectionTitle title="Для тебе" />}
      <ProductsList products={data.items} variant={variant} />
      <CustomPagination
        size={data.size}
        page={searchParams.page}
        setPage={setSearchParams}
      />
    </div>
  );
};
