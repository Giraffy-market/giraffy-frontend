'use client';

import type {
  ElementType,
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';

import styles from './CheckBox.module.scss';

interface CheckBoxProps {
  labelText: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const CheckBox: FC<CheckBoxProps> = ({
  labelText,
  labelProps,
  inputProps,
}) => {
  return (
    <label className={styles.check} {...labelProps}>
      {labelText}
      <input className={styles.check__input} type="checkbox" {...inputProps} />
      <span className={styles.check__box} />
    </label>
  );
};
