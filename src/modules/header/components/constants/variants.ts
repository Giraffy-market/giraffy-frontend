import type { Variants } from 'framer-motion';

export const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};
