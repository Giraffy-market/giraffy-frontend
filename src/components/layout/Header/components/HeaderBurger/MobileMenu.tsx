import { useState } from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

import { LOGIN_FORM_MODAL_KEY, MODAL_QUERY_STATE } from '@/modules/auth';
import {
  FAVOURITES,
  LANGUAGES,
  NAVMOBILE,
  NOTIFICATIONS,
  USER,
} from '@/modules/categories/constants/constants';
import { useCurrentUser } from '@/modules/user/hooks/useCurrentUser';

import { routing } from '@/shared/routing';

import styles from './styles/MobileMenu.module.scss';

import DropdownCategoriesIcon from '../../assets/Expand_right_light.svg';
import CategoriesLogo from '../../assets/categories.svg';
import { MobileCategories } from './MobileCategories';

type Props = {
  onClose?: () => void;
};

export const MobileMenu = ({ onClose }: Props) => {
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const { status } = useSession();
  const { user, isLoading } = useCurrentUser();
  const isLoggedIn = status === 'authenticated';

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const [isUserListOpen, setIsUserListOpen] = useState(false);

  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLinkClick = () => {
    setIsUserListOpen(false);
    if (onClose) onClose();
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }

  //   // cleanup on unmount, just in case
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [isOpen]);
  return (
    <div className={styles.overlay}>
      {isLoggedIn && user ? (
        <div className={styles.userRow}>
          <div className={styles.userIcon}>
            <USER.Icon />
          </div>

          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user.username || 'Користувач'}</h1>
            <div className={styles.userDropdownSection}>
              <div className={styles.leftGroup}>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
              <button
                className={styles.rightGroup}
                onClick={() => setIsUserListOpen((prev) => !prev)}
                role="button"
              >
                <span className={styles.dropdownWrapper}>
                  <DropdownCategoriesIcon
                    className={`${styles.dropdownButton} ${
                      isUserListOpen ? styles.dropdownButtonOpen : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
          {isUserListOpen && (
            <div className={styles.userDropdownContent}>
              <button className={styles.actionButton}>Додати оголошення</button>
              <nav className={styles.nav}>
                {NAVMOBILE.map((item) => {
                  if (item.id === 'languages') {
                    return (
                      <div key={item.id} className={styles.langWrapper}>
                        <button
                          className={styles.navItem}
                          type="button"
                          onClick={() => setIsLangOpen(!isLangOpen)}
                        >
                          <item.Icon />
                          <span>{item.label}</span>
                          <DropdownCategoriesIcon
                            className={`${styles.dropdownButton} ${
                              isLangOpen ? styles.dropdownButtonOpen : ''
                            }`}
                          />
                        </button>
                        {isLangOpen && (
                          <div className={styles.langList}>
                            {LANGUAGES.map((lang) => (
                              <button
                                key={lang.id}
                                className={styles.langOption}
                                //Тут буде перемикання мови у подальшому
                                onClick={() =>
                                  console.log(`Обрано мову: ${lang.label}`)
                                }
                              >
                                {lang.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  if (item.id === 'logout') {
                    return (
                      <button
                        key={item.id}
                        className={styles.navItem}
                        onClick={() =>
                          signOut({ callbackUrl: routing.home.base })
                        }
                      >
                        <item.Icon />
                        <span>{item.label}</span>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={styles.navItem}
                      onClick={handleLinkClick}
                    >
                      <item.Icon />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.guestRow}>
          <div className={styles.guestWrapper}>
            <p className={styles.loginMessage}>
              Увійдіть щоб користуватися всіма можливостями
            </p>
            <button
              className={styles.actionButton}
              type="button"
              onClick={() => setModal(LOGIN_FORM_MODAL_KEY)}
            >
              Увійти
            </button>
          </div>
        </div>
      )}
      <div className={styles.list}>
        <button
          className={styles.categoriesButton}
          onClick={() => setIsCategoriesOpen(true)}
        >
          <span className={styles.leftGroup}>
            <CategoriesLogo />
            <span>Категорії</span>
          </span>
          <div className={styles.rightGroup}>
            <DropdownCategoriesIcon />
          </div>
        </button>
        <MobileCategories
          isOpen={isCategoriesOpen}
          onClose={() => {
            setIsCategoriesOpen(false);
          }}
        />
        <div className={styles.notifications}>
          <Link href={NOTIFICATIONS.href} className={styles.itemRow}>
            <NOTIFICATIONS.Icon />
            <span>{NOTIFICATIONS.label}</span>
          </Link>
        </div>
        <div className={styles.favourites}>
          <Link href={FAVOURITES.href} className={styles.itemRow}>
            <FAVOURITES.Icon />
            <span>{FAVOURITES.label}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
