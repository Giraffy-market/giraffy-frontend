import { Filters } from '@/modules/filters';
import { Products } from '@/modules/products';

const page = () => {
  return (
    <div>
      <Filters />
      <Products showTitle={false} variant="catalog" />
    </div>
  );
};

export default page;
