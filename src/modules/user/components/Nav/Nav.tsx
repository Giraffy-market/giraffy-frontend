import Link from 'next/link';

import styles from './styles/Nav.module.scss';

import { NAV } from '../../constants/constants';

export const Nav = () => {
  return (
    <div>
      {NAV.map((item) => (
        <Link key={item.id} href={item.href} className={styles.navItem}>
          <item.Icon />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
