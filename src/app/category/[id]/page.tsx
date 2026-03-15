import { Suspense } from 'react';

import { Products } from '@/modules/products/Products';

import { Breadcrumbs } from '@/components/common/Breadcrumbs/Breadcrumbs';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <div className="container">
      <Breadcrumbs />

      <Suspense key={resolvedParams.id} fallback={<div>Завантаження...</div>}>
        <Products categoryId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}
