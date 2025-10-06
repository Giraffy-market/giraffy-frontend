import { FC } from 'react';

import cn from 'classnames';

import css from './styles/styles.module.scss';

type Props = {
  label: string;
  isHome?: boolean;
  isUpdate?: boolean;
};

const Button: FC<Props> = ({ label, isHome, isUpdate }) => {
  return (
    <button
      className={cn(css.button, {
        [css['button--home']]: isHome,
        [css['button--update']]: isUpdate,
      })}
      type="button"
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
