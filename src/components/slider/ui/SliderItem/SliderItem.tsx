import type { ElementType, FC } from 'react';

import cn from 'classnames';

import { Button } from '@/ui/button/Button';

import './SliderItem.scss';

const SLIDER_CLASSNAMES = [
  'slider1',
  'slider2',
  'slider3',
  'slider4',
  'slider5',
];

type SliderItemProps = {
  data: {
    Icon: ElementType;
    title: string;
    description: string;
    buttonsLabel: string;
  };
  index: number;
};

export const SliderItem: FC<SliderItemProps> = ({ data, index }) => {
  const Icon = data.Icon;
  return (
    <div className={cn('slider', SLIDER_CLASSNAMES[index - 1])}>
      <div className="slider-image__wrapper">
        <Icon className="slide-image" role="img" aria-label="giraffe" />
      </div>

      <div className="slider-info_wrapper">
        <div className="slider-text__wrapper">
          <h2 className="slider-title">{data.title}</h2>
          <p className="slider-description">{data.description}</p>
        </div>

        <div className="slider-button__wrapper">
          <Button type="button" text={data.buttonsLabel} variant="primary" />
        </div>
      </div>
    </div>
  );
};
