'use client';

import { FC } from 'react';

import cn from 'classnames';

import css from './styles/styles.module.scss';

type Props = {
  label: string;
  isUpdate?: boolean;
  onClick?: () => void;
};

const Button: FC<Props> = ({ label, isUpdate, onClick }) => {
  return (
    <button
      className={cn(css.button, {
        [css['button--update']]: isUpdate,
      })}
      type="button"
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
