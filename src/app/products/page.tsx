import { Products } from '@/modules/products';

const page = () => {
  return (
    <div>
      <Products showTitle={false} variant="catalog" />
    </div>
  );
};

export default page;
