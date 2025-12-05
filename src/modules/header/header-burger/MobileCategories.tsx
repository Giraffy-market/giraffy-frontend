import DropdownCategoriesIcon from '@/components/header/assets/Expand_right_light.svg';

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

      <div className={styles.content}>
        <ul className={styles.categoryList}>
          <li>Electronics</li>
          <li>Books</li>
          <li>Home</li>
          <li>Fashion</li>
          <li>Toys</li>
        </ul>
      </div>
    </div>
  ) : null;
};
