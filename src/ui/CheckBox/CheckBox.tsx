"use client";

import { InputHTMLAttributes, type FC } from 'react';

import styles from './CheckBox.module.scss';
interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement & HTMLLabelElement> {
  labelText: string;
}

export const CheckBox: FC<CheckBoxProps> = ({ labelText, ...props }) => {
  return (
    <label className={`${styles.check} ${styles.option}`} {...props}>
      {labelText}
      <input className={styles.check__input} type="checkbox" {...props} />
      <span className={styles.check__box} />
    </label>
  );
};

export default CheckBox;
