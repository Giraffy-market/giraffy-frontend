import { useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import BurgerIcon from '../../assets/Menu.svg';
import { MobileMenu } from './MobileMenu';

export const HeaderBurger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button type="button">
          <BurgerIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Мобільне меню</DrawerTitle>
          <DrawerDescription>Навігація по сайту</DrawerDescription>
        </DrawerHeader>

        <MobileMenu onClose={closeMenu} />
      </DrawerContent>
    </Drawer>
  );
};
