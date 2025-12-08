import Link from 'next/link';

import DropdownCategoriesIcon from '@/components/header/assets/Expand_right_light.svg';

import { NAVCATEGORIES } from '../constants/constants';

import styles from './styles/MobileCategories.module.scss';

export const MobileCategories = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return isOpen ? (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.title}>
        <button className={styles.closeBtn} onClick={onClose}>
          <DropdownCategoriesIcon />
        </button>
        <p>Категорії</p>
      </div>

      <nav className={styles.nav}>
        {NAVCATEGORIES.map((item) => (
          <Link key={item.id} href={item.href} className={styles.navItem}>
            <item.Icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  ) : null;
};
