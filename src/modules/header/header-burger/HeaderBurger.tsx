import BurgerIcon from '@/components/header/assets/Menu.svg';

import { Button } from '@/ui/button/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer';

import { MobileMenu } from './MobileMenu';

export const HeaderBurger = () => {
  return (
    <Drawer direction="left" dismissible={false}>
      <DrawerTrigger>
        <BurgerIcon />
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
