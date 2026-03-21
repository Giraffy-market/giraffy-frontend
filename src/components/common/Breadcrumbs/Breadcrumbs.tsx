'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Arrow from '@/components/common/Slider/assets/arrow.svg';

import { getDictionaryKey } from './constants/breadcrumbsData';

import { routing } from '@/shared/routing';

import styles from './styles/Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const isExcludedPage = pathname === routing.home.base;

  if (isExcludedPage) return null;

  const allSegments = pathname.split('/').filter(Boolean);
  const breadcrumbSegments = allSegments.filter((seg) => seg !== 'category');

  const paths = breadcrumbSegments.map((seg, i) => {
    const decodedName = decodeURIComponent(seg);

    const originalIndex = allSegments.indexOf(seg);
    const fullHref = '/' + allSegments.slice(0, originalIndex + 1).join('/');

    return {
      name: getDictionaryKey(decodedName),
      href: fullHref,
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
