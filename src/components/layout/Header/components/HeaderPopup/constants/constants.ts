import BasketIcon from '@/components/common/ProfilePopup/assets/basket.svg';
import ChatsIcon from '@/components/common/ProfilePopup/assets/chats.svg';
import UserIcon from '@/components/common/ProfilePopup/assets/default-profile-icon.svg';
import LogoutIcon from '@/components/common/ProfilePopup/assets/logout.svg';
import OrdersIcon from '@/components/common/ProfilePopup/assets/my-orders.svg';
import UserProfileIcon from '@/components/common/ProfilePopup/assets/profile-skeleton.svg';
import HelpIcon from '@/components/common/ProfilePopup/assets/support.svg';
import ProfileIcon from '@/components/layout/Header/assets/profile.svg';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  Icon: React.ElementType;
};

export const TRIGGER = {
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
