type Endpoints = {
  ROOT: string;
  CREATE: string;
  BY_ID: (id: string | number) => string;
  UPDATE: (id: string | number) => string;
  DELETE: (id: string | number) => string;
};

export const makeEndpoints = (base: string): Endpoints => ({
  ROOT: base,
  CREATE: base,
  BY_ID: (id: string | number) => `${base}/${id}`,
  UPDATE: (id: string | number) => `${base}/${id}`,
  DELETE: (id: string | number) => `${base}/${id}`,
});
