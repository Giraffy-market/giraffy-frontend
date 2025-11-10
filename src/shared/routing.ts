export const routing = {
  home: { base: '/' },
  categories: {
    base: '/categories',
    byName: (name: string) => `/categories/${encodeURIComponent(name)}`,
  },
};
