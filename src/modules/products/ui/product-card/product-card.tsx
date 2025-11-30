import type { FC } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import type { Product } from '@/modules/products/types/Product';

import FavoriteIconUnchecked from '../../assets/add-to-favourite-unchecked.svg';
import NoData from '../../assets/no-data.jpg';
import ReviewIcon from '../../assets/reviews.svg';
import './product-card.scss';

type Props = {
  product: Product;
  variant?: string;
};

export const ProductCard: FC<Props> = ({ product, variant }) => {
  const { title, price, location, comments_count } = product;

  return (
    <div className="product-card">
      <button type="button" className="product-card__favorite-button">
        <div className="product-card__favorite-button-icon">
          <FavoriteIconUnchecked />
        </div>
      </button>

      <Image src={NoData} alt="no-data" className="product-card__image" />

      <div className="product-card__info">
        <h3 className="product-card__info-title">{title}</h3>

        <p className="product-card__info-price">{price} грн</p>
      </div>

      <div className="product-card__additional">
        <div className="product-card__additional-info">
          <p className="product-card__additional-info-location">{location}</p>

          <p className="product-card__additional-info-created">
            {new Date().toLocaleDateString('uk-UA')}
          </p>
        </div>

        {comments_count === 0 && (
          <div
            className={cn({
              ['product-card__additional-reviews']: variant === 'home',
              ['product-card__additional-reviews-catalog']:
                variant === 'catalog',
            })}
          >
            <ReviewIcon />
            <span>{comments_count}</span>
          </div>
        )}
      </div>
    </div>
  );
};
