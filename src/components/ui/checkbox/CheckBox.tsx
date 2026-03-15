'use client';

import type {
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';

import styles from './CheckBox.module.scss';

type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  labelText: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  value?: boolean;
};
export const CheckBox: FC<CheckBoxProps> = ({
  labelText,
  labelProps,
  value,
  className,
  ...inputProps
}) => {
  return (
    <label
      className={`${styles.check} ${value ? styles.check_error : ''} ${className || ''}`}
      {...labelProps}
    >
      {labelText}
      <input className={styles.check__input} type="checkbox" {...inputProps} />
      <span className={styles.check__box} />
    </label>
  );
};
