'use client';

import { FiltersLayout } from '@/modules/filters';
import { useFetchCategories } from '@/modules/header/header-categories/api/useFetchCategories';
import { Products } from '@/modules/products';

import { Loader } from '@/ui/loader/Loader';
import Error from '@/ui/loadingErrorPage/LoadingErrorPage';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

import './products-page.scss';

const ProductsPage = () => {
  const { data, isLoading, error } = useFetchCategories();

  if (isLoading) return <Loader />;
  if (error || !data) {
    const errorMsg = handleApiError(error);
    return (
      <Error title={['Упс!', 'Щось пішло не так']} description={errorMsg} />
    );
  }

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
