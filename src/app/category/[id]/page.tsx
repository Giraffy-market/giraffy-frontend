import { Suspense } from 'react';

import { Products } from '@/modules/products/Products';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <Suspense key={resolvedParams.id} fallback={<div>Завантаження...</div>}>
      <Products categoryId={resolvedParams.id} />
    </Suspense>
  );
}
