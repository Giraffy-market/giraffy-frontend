import type { FC, InputHTMLAttributes, ReactNode } from 'react';

import styles from './CheckBox.module.scss';

// Для отримання необхідних властивостей в input, для прокидання пропсів, з різними станами чекбокса + відображення назви самого чекбокса, обгорнутим в label.
interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export const CheckBox: FC<CheckBoxProps> = ({ children, ...props }) => {
  return (
    <label className={`${styles.check} ${styles.option}`}>
      {children}
      <input className={styles.check__input} type="checkbox" {...props} />
      <span className={styles.check__box}></span>
    </label>
  );
};

export default CheckBox;
