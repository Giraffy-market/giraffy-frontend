'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { NAVCATEGORIES } from '@/modules/categories/constants/constants';

import styles from './styles/MobileCategories.module.scss';

import DropdownCategoriesIcon from '../../assets/Expand_right_light.svg';

interface MobileCategoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileCategories = ({
  isOpen,
  onClose,
}: MobileCategoriesProps) => {
  const router = useRouter();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.title}>
        <button className={styles.closeBtn} onClick={onClose}>
          <DropdownCategoriesIcon />
        </button>
        <p>Категорії</p>
      </div>

      <nav className={styles.nav}>
        {NAVCATEGORIES.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={styles.navItem}
            onClick={onClose}
          >
            <item.Icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
