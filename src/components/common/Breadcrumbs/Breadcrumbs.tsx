'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVCATEGORIES } from '@/modules/categories/constants/constants';

import Arrow from '@/components/common/Slider/assets/arrow.svg';

import { getDictionaryKey } from './constants/breadcrumbsData';

import { routing } from '@/shared/routing';

import styles from './styles/Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === routing.home.base) return null;

  const segments = pathname.split('/').filter(Boolean);

  const paths = segments
    .filter((seg) => seg !== 'category')
    .map((seg) => {
      const category = NAVCATEGORIES.find((c) => c.id === seg);
      return {
        name: category
          ? category.label_ua || category.label
          : getDictionaryKey(seg),
        href: '/' + segments.slice(0, segments.indexOf(seg) + 1).join('/'),
      };
    });

  return (
    <nav className={styles.breadcrumbs}>
      <Arrow className={styles.startArrow} />
      <span className={styles.linkWithSeparator}>
        <Link href={routing.home.base} className={styles.link}>
          Головна сторінка
        </Link>
        {paths.length > 0 && <span className={styles.separator}>/</span>}
      </span>

      {paths.map((item, index) => (
        <span key={item.href} className={styles.linkWithSeparator}>
          {index === paths.length - 1 ? (
            <span className={styles.current}>{item.name}</span>
          ) : (
            <Link href={item.href} className={styles.link}>
              {item.name}
            </Link>
          )}
          {index !== paths.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </span>
      ))}
    </nav>
  );
};
