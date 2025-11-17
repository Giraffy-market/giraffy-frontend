export const routing = {
  home: { base: '/' },
  categories: {
    base: '/categories',
    byId: (id: string | number) => `/categories/${id}`,
    byName: (name: string) => `/categories/${name}`,
  },
};
