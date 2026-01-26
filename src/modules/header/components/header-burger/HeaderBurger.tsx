import BurgerIcon from '@/components/header/assets/burgerMenu.svg';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer';

import './HeaderBurger.scss';
import { MobileMenu } from './MobileMenu';

export const HeaderBurger = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <BurgerIcon className="burger-icon" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
          <MobileMenu />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
