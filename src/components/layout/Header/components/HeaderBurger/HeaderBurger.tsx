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
  return (
    <Drawer direction="left" dismissible>
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
