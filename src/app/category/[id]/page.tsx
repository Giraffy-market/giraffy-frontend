import { Products } from '@/modules/products/Products';

interface PageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: PageProps) {
  console.log('CategoryPage params:', params);

  return <Products key={params.id} categoryId={params.id} />;
}
