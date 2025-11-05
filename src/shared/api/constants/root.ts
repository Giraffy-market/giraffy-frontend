export const makeEndpoints = (base: string) => ({
  ROOT: base,
  CREATE: base,
  BY_ID: (id: string | number) => `${base}/${id}`,
  UPDATE: (id: string | number) => `${base}/${id}`,
  DELETE: (id: string | number) => `${base}/${id}`,
});
