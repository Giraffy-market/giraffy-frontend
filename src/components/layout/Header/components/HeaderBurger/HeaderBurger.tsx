import { Button } from '@/components/ui/button/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import BurgerIcon from '../../assets/Menu.svg';
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
