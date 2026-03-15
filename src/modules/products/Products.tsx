'use client';

import { type FC, useEffect, useState } from 'react';
import type { ComponentProps } from 'react';

import { useFetchProducts } from '@/modules/products/api/useFetchProducts';
import SettingsIcon from '@/modules/products/assets/settings.svg';
import { ProductsList } from '@/modules/products/components/products-list';

import { Loader } from '@/components/ui/loader/Loader';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';
import { ToastMessage } from '@/components/ui/toastMessage/toastMessages';

import { ProductFilters } from './ui/ProductFilters/ProductFilters';

import { handleApiError } from '@/shared/api/helpers/handleApiError';
import type { Product } from '@/shared/mock/products.data';

import styles from './Products.module.scss';

interface ProductsProps {
  categoryId?: string;
}

export const Products: FC<ProductsProps> = ({ categoryId }) => {
  const { data, isLoading, error } = useFetchProducts();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFiltersOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileFiltersOpen(false);
    };

    if (isMobileFiltersOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileFiltersOpen]);

  if (isLoading) return <Loader />;
  if (error || !data) {
    const errorMessage = handleApiError(error);
    return <ToastMessage message={errorMessage} type="error" />;
  }

  const title = categoryId ? decodeURIComponent(categoryId) : 'Для тебе';

  return (
    <div className={`container ${styles.productsWrapper}`}>
      {categoryId && (
        <aside className={styles.desktopFilters}>
          <ProductFilters />
        </aside>
      )}

      <div className={styles.content}>
        {categoryId && (
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <SettingsIcon />
            <span>Фільтри</span>
          </button>
        )}
        <div className={styles.header}>
          <SectionTitle title={title} />
        </div>
        <ProductsList
          products={
            data.items as unknown as ComponentProps<
              typeof ProductsList
            >['products']
          }
        />
      </div>

      {isMobileFiltersOpen && (
        <div
          className={styles.mobileFiltersOverlay}
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className={styles.mobileFiltersContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileFiltersHeader}>
              <h3>Фільтри</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                ✕
              </button>
            </div>
            <ProductFilters />
          </div>
        </div>
      )}
    </div>
  );
};
