import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import styles from './styles.module.scss';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'outline' | 'ghost';
  size?: 'md' | 'icon';
  asChild?: boolean;
};

function Button({
  className,
  variant = 'outline',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-variant={variant}
      className={`${styles.button} ${className ?? ''}`.trim()}
      {...props}
    />
  );
}

export default Button;
