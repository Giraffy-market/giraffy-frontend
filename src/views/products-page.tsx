import { FiltersLayout } from '@/modules/filters';
import { Products } from '@/modules/products';

import './products-page.scss';

const ProductsPage = () => {
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
