export const DICTIONARY: Record<string, string> = {
  '/categories': 'Категорії',
  // TODO: Додати адресу та назви можливих сторінок
};

export const getDictionaryKey = (key: string): string => {
  return DICTIONARY[`/${key}`] || key;
};
