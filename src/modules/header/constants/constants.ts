import BeautyCareIcon from '@/components/categories/assets/beauty-care-mobile.svg';
import TransportIcon from '@/components/categories/assets/cars-care-mobile.svg';
import ClothesIcon from '@/components/categories/assets/clothes-mobile.svg';
import ElectronicsIcon from '@/components/categories/assets/electronics-mobile.svg';
import HobbiesIcon from '@/components/categories/assets/hobbies-mobile.svg';
import HouseCareIcon from '@/components/categories/assets/house-care-mobile.svg';
import KidsIcon from '@/components/categories/assets/kids-mobile.svg';
import KitchenIcon from '@/components/categories/assets/kitchen-mobile.svg';
import PetsIcon from '@/components/categories/assets/pets-mobile.svg';
import FavouritesIcon from '@/components/header/assets/favourites.svg';
import NotificationsIcon from '@/components/header/assets/notification.svg';
import ProfileIcon from '@/components/header/assets/profile.svg';
import BasketIcon from '@/components/profilePopup/assets/basket.svg';
import BonusesIcon from '@/components/profilePopup/assets/bonuses.svg';
import ChatsIcon from '@/components/profilePopup/assets/chats.svg';
import UserIcon from '@/components/profilePopup/assets/default-profile-icon.svg';
import LanguageIcon from '@/components/profilePopup/assets/locale.svg';
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

export const NAVCATEGORIES: NavItem[] = [
  {
    id: 'kids-products',
    label: 'Дитячі продукти',
    href: '/kids-products',
    Icon: KidsIcon,
  },
  {
    id: 'clothes',
    label: 'Одяг і взуття',
    href: '/clothes',
    Icon: ClothesIcon,
  },
  {
    id: 'house-care',
    label: 'Для дому',
    href: '/house-care',
    Icon: HouseCareIcon,
  },
  {
    id: 'kitchen',
    label: 'Кухня',
    href: '/kitchen',
    Icon: KitchenIcon,
  },
  {
    id: 'hobbies',
    label: 'Хобі та розваги',
    href: '/hobbies',
    Icon: HobbiesIcon,
  },
  {
    id: 'electronics',
    label: 'Електроніка',
    href: '/electronics',
    Icon: ElectronicsIcon,
  },
  {
    id: 'beauty-care',
    label: 'Краса та догляд',
    href: '/beauty-care',
    Icon: BeautyCareIcon,
  },
  {
    id: 'pets',
    label: 'Тварини',
    href: '/pets',
    Icon: PetsIcon,
  },
  {
    id: 'transport',
    label: 'Транспорт',
    href: '/transport',
    Icon: TransportIcon,
  },
];

export const SUPPORT = {
  id: 'support',
  label: 'Підтримка та допомога',
  href: '/support',
  Icon: HelpIcon,
};
export const LOGOUT = { id: 'logout', label: 'Вийти', Icon: LogoutIcon };

export const NOTIFICATIONS = {
  id: 'notifications',
  label: 'Сповіщення',
  href: '/notifications',
  Icon: NotificationsIcon,
};

export const FAVOURITES = {
  id: 'favourites',
  label: 'Обрані',
  href: '/favourites',
  Icon: FavouritesIcon,
};
