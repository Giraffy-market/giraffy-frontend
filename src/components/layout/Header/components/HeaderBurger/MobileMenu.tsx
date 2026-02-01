import { useEffect, useState } from 'react';

import Link from 'next/link';
import { Interface } from 'readline';

import {
  FAVOURITES,
  LANGUAGES,
  NAVMOBILE,
  NOTIFICATIONS,
  USER,
} from '@/modules/categories/constants/constants';

import styles from './styles/MobileMenu.module.scss';

import DropdownCategoriesIcon from '../../assets/Expand_right_light.svg';
import CategoriesLogo from '../../assets/categories.svg';
import { MobileCategories } from './MobileCategories';

export const MobileMenu = () => {
  const [user, setUser] = useState(false);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const [isUserListOpen, setIsUserListOpen] = useState(false);

  const [isLangOpen, setIsLangOpen] = useState(false);

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
      {user ? (
        <div className={styles.userRow}>
          <div className={styles.userIcon}>
            <USER.Icon />
          </div>

          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{USER.name}</h1>
            <div className={styles.userDropdownSection}>
              <div className={styles.leftGroup}>
                <p className={styles.userEmail}>{USER.email}</p>
              </div>
              <button
                className={styles.rightGroup}
                onClick={() => {
                  setIsUserListOpen((prev) => !prev);
                }}
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
              {/* whatever you want to show below */}
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

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={styles.navItem}
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
              onClick={() => {
                setUser(true);
              }}
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
