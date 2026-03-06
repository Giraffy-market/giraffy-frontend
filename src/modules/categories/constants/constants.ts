// import BasketIcon from '../assets/assets/basket.svg';
import BeautyCareIcon from '../assets/beauty-care-mobile.svg';
import BeautyCare from '../assets/beauty-care.svg';
import BasketIcon from '../assets/bonuses.svg';
import BonusesIcon from '../assets/bonuses.svg';
// import UserProfileIcon from '../assets/profile-skeleton.svg';
import UserProfileIcon from '../assets/bonuses.svg';
import TransportIcon from '../assets/cars-care-mobile.svg';
import CarsCare from '../assets/cars-care.svg';
import ChatsIcon from '../assets/chats.svg';
import ClothesIcon from '../assets/clothes-mobile.svg';
import Clothes from '../assets/clothes.svg';
import ElectronicsIcon from '../assets/electronics-mobile.svg';
import Electronics from '../assets/electronics.svg';
import FavouritesIcon from '../assets/favourites.svg';
// import UserIcon from '../assets/default-profile-icon.svg';
import UserIcon from '../assets/giraffe-sunglasses-menu.svg';
import HobbiesIcon from '../assets/hobbies-mobile.svg';
import Hobbies from '../assets/hobbies.svg';
import HouseCareIcon from '../assets/house-care-mobile.svg';
import HouseCare from '../assets/house-care.svg';
import KidsIcon from '../assets/kids-mobile.svg';
import Kids from '../assets/kids.svg';
import KitchenIcon from '../assets/kitchen-mobile.svg';
import Kitchen from '../assets/kitchen.svg';
import LanguageIcon from '../assets/locale.svg';
import LogoutIcon from '../assets/logout.svg';
import OrdersIcon from '../assets/my-orders.svg';
import NotificationsIcon from '../assets/notification.svg';
import PetsIcon from '../assets/pets-mobile.svg';
import Pets from '../assets/pets.svg';
import ProfileIcon from '../assets/profile.svg';
import HelpIcon from '../assets/support.svg';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const categoryIcons = [
  HouseCare,
  Pets,
  Kids,
  Electronics,
  Hobbies,
  Clothes,
  BeautyCare,
  Kitchen,
  CarsCare,
];

export type NavItem = {
  id: string;
  label: string;
  label_ua?: string;
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
    label: 'Kids Products',
    label_ua: 'Дитячі продукти',
    href: '/category/kids-products',
    Icon: KidsIcon,
  },
  {
    id: 'clothes',
    label: 'Clothes & Shoes',
    label_ua: 'Одяг і взуття',
    href: '/category/clothes',
    Icon: ClothesIcon,
  },
  {
    id: 'house-care',
    label: 'House Care',
    label_ua: 'Для дому',
    href: '/category/house-care',
    Icon: HouseCareIcon,
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    label_ua: 'Кухня',
    href: '/category/kitchen',
    Icon: KitchenIcon,
  },
  {
    id: 'hobbies',
    label: 'Hobbies & Entertainment',
    label_ua: 'Хобі та розваги',
    href: '/category/hobbies',
    Icon: HobbiesIcon,
  },
  {
    id: 'electronics',
    label: 'Electronics',
    label_ua: 'Електроніка',
    href: '/category/electronics',
    Icon: ElectronicsIcon,
  },
  {
    id: 'beauty-care',
    label: 'Beauty & Care',
    label_ua: 'Краса та догляд',
    href: '/category/beauty-care',
    Icon: BeautyCareIcon,
  },
  {
    id: 'pets',
    label: 'Pets',
    label_ua: 'Тварини',
    href: '/category/pets',
    Icon: PetsIcon,
  },
  {
    id: 'transport',
    label: 'Transport',
    label_ua: 'Транспорт',
    href: '/category/transport',
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

export const LANGUAGES = [
  { id: 'ua', label: 'Українська', code: 'uk' },
  { id: 'en', label: 'English', code: 'en' },
];
