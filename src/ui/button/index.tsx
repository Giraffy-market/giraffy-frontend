import type { ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import styles from './styles.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  asChild?: boolean;
};

function Button({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-size={size}
      data-variant={variant}
      className={`${styles.button} ${className ?? ''}`.trim()}
      {...props}
    />
  );
}

export default Button;
