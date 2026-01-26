import type { StaticImageData } from 'next/image';

export type Review = {
  id: number;
  user: {
    name: string;
    avatar: string | StaticImageData;
  };
  rating: number;
  text: string;
};
