import type { NavItem } from '@/shared/types';

import UserProfileIcon from '../assets/bonuses.svg';
import BasketIcon from '../assets/bonuses.svg';
import BonusesIcon from '../assets/bonuses.svg';
import ChatsIcon from '../assets/chats.svg';
import UserIcon from '../assets/giraffe-sunglasses-menu.svg';
import LanguageIcon from '../assets/locale.svg';
import LogoutIcon from '../assets/logout.svg';
import OrdersIcon from '../assets/my-orders.svg';
import HelpIcon from '../assets/support.svg';

export const NAV: NavItem[] = [
  {
    id: 'profile',
    label: 'Профіль користувача',
    href: '/profile/me',
    Icon: UserProfileIcon,
  },
  { id: 'chats', label: 'Чати', href: '/chats', Icon: ChatsIcon },
  { id: 'my-ads', label: 'Мої оголошення', href: '/my-ads', Icon: OrdersIcon },
  {
    id: 'purchases',
    label: 'Мої покупки',
    href: '/purchases',
    Icon: BasketIcon,
  },
];

export const NAVMOBILE: NavItem[] = [
  {
    id: 'profile',
    label: 'Профіль користувача',
    href: '/profile',
    Icon: UserProfileIcon,
  },
  { id: 'chats', label: 'Чати', href: '/chats', Icon: ChatsIcon },
  { id: 'my-ads', label: 'Мої оголошення', href: '/my-ads', Icon: OrdersIcon },
  { id: 'bonuses', label: 'Бонуси', href: '/bonuses', Icon: BonusesIcon },
  {
    id: 'languages',
    label: 'Українська',
    href: '/languages',
    Icon: LanguageIcon,
  },
  { id: 'help', label: 'Підтримка та допомога', href: '/help', Icon: HelpIcon },
  { id: 'logout', label: 'Вийти', href: '/logout', Icon: LogoutIcon },
];

export const USER = {
  name: 'User',
  email: 'user@example.com',
  Icon: UserIcon,
};
