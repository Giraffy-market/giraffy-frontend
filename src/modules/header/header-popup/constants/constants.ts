import ProfileIcon from '@/components/header/assets/profile.svg';
import BasketIcon from '@/components/profilePopup/assets/basket.svg';
import ChatsIcon from '@/components/profilePopup/assets/chats.svg';
import UserIcon from '@/components/profilePopup/assets/default-profile-icon.svg';
import LogoutIcon from '@/components/profilePopup/assets/logout.svg';
import OrdersIcon from '@/components/profilePopup/assets/my-orders.svg';
import UserProfileIcon from '@/components/profilePopup/assets/profile-skeleton.svg';
import HelpIcon from '@/components/profilePopup/assets/support.svg';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  Icon: React.ElementType;
};

export const TRIGER = {
  Icon: ProfileIcon,
};

export const USER = {
  name: 'User',
  email: 'user@example.com',
  Icon: UserIcon,
};

export const ADD = {
  id: 'add',
  label: 'Додати оголошення',
  href: '/ads/new',
};

export const NAV: NavItem[] = [
  {
    id: 'profile',
    label: 'Профіль користувача',
    href: '/profile',
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

export const SUPPORT = {
  id: 'support',
  label: 'Підтримка та допомога',
  href: '/support',
  Icon: HelpIcon,
};
export const LOGOUT = { id: 'logout', label: 'Вийти', Icon: LogoutIcon };

export const ROUTING = '/';

export const USER_QUERY_KEY = 'get-user-me';
