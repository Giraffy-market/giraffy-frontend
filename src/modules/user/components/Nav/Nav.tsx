import Link from 'next/link';

import styles from './styles/Nav.module.scss';

import { NAV } from '../../constants/constants';

interface NavProps {
  onLinkClick?: () => void;
}

export const Nav = ({ onLinkClick }: NavProps) => {
  return (
    <div>
      {NAV.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={styles.navItem}
          onClick={onLinkClick}
        >
          <item.Icon />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
