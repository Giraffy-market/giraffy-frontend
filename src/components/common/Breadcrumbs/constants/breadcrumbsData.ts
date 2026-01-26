import { routing } from '@/shared/routing';

export const DICTIONARY: Record<string, string> = {
  [routing.categories.base]: 'Категорії',
  // TODO: Додати адресу та назви можливих сторінок
};

export const getDictionaryKey = (key: string): string =>
  DICTIONARY[`/${key}`] || key;
