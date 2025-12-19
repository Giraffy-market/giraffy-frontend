import BurgerIcon from '@/components/header/assets/burgerMenu.svg';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer';

// import { MobileMenu } from './MobileMenu';

import './HeaderBurger.scss';

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
          {/* <MobileMenu /> */}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
