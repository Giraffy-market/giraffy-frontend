'use client';

import { type FC, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { NAVCATEGORIES } from '@/modules/categories/constants/constants';
import styles from '@/modules/products/Products.module.scss';
import { useFetchProducts } from '@/modules/products/api/useFetchProducts';
import SettingIcon from '@/modules/products/assets/settings.svg';
import { ProductsList } from '@/modules/products/components/products-list';
import { ProductFilters } from '@/modules/products/ui/ProductFilters/ProductFilters';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader/Loader';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';
import { ToastMessage } from '@/components/ui/toastMessage/toastMessages';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

interface ProductsProps {
  categoryId?: string;
}

export const Products: FC<ProductsProps> = ({ categoryId }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();

  const displayTitle = useMemo(() => {
    if (categoryId) {
      const currentCategory = NAVCATEGORIES.find(
        (cat) => cat.id === categoryId,
      );
      return currentCategory
        ? currentCategory.label_ua || currentCategory.label
        : 'Товари';
    }
    return 'Усі товари';
  }, [categoryId]);

  const filters = useMemo(() => {
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') || undefined;
    const maxPrice = searchParams.get('maxPrice') || undefined;
    const city = searchParams.getAll('city');
    const status = searchParams.getAll('status');
    const category = categoryId
      ? [categoryId]
      : searchParams.getAll('category');

    return {
      search,
      minPrice,
      maxPrice,
      city: city.length > 0 ? city : undefined,
      status: status.length > 0 ? status : undefined,
      category: category.length > 0 ? category : undefined,
    };
  }, [searchParams, categoryId]);

  const { data, isLoading, error } = useFetchProducts(filters);

  if (isLoading) return <Loader />;
  if (error)
    return <ToastMessage message={handleApiError(error)} type="error" />;

  return (
    <div className="container">
      <div className={styles.mainLayout}>
        <ProductFilters />
        <main className={styles.productsContent}>
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setIsFilterOpen(true)}
          >
            <div className={styles.innerBtnContent}>
              <SettingIcon className={styles.svgSetting} />
              <span>Фільтри</span>
            </div>
          </button>
          <SectionTitle title={displayTitle} />
          {data && data.items && data.items.length > 0 ? (
            <ProductsList products={data.items} />
          ) : (
            <div className={styles.noResults}>
              <ToastMessage message="Товари не знайдено" type="info" />
            </div>
          )}
        </main>
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogOverlay className={styles.mobileOverlay} />
          <DialogContent className={styles.mobileModal} showCloseButton={false}>
            <DialogHeader className={styles.modalHeader}>
              <DialogTitle className={styles.modalTitle}>Фільтри</DialogTitle>
              <button
                className={styles.closeBtn}
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </DialogHeader>
            <div className={styles.modalBody}>
              <ProductFilters />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
