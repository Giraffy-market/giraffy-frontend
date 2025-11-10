export type CategoryItem = {
  category_id: number;
  name: string;
  children?: CategoryItem[];
};
