import { FiltersLayout } from '@/modules/filters';
import { Products } from '@/modules/products';

import css from './page.module.scss';

const page = () => {
  return (
    <div className="container">
      <div className={css.page_wrapper}>
        <FiltersLayout />
        <Products showTitle={false} variant="catalog" />
      </div>
    </div>
  );
};

export default page;
