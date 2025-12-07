'use client';

import { FiltersLayout } from '@/modules/filters';
import { useFetchCategories } from '@/modules/header/header-categories/api/useFetchCategories';
import { Products } from '@/modules/products';

import { Loader } from '@/ui/loader/Loader';

import './products-page.scss';

const ProductsPage = () => {
  const { data, isLoading, error } = useFetchCategories();

  if (isLoading) return <Loader />;
  if (error || !data) return <div>Помилка завантаження категорій</div>;

  return (
    <div className="container">
      <div className="page_wrapper">
        <FiltersLayout />
        <Products showTitle={false} variant="catalog" />
      </div>
    </div>
  );
};

export default ProductsPage;
