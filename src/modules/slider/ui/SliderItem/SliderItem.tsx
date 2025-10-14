import type { ElementType, FC } from 'react';

import cn from 'classnames';

import './SliderItem.scss';

type SliderItemProps = {
  Icon: ElementType;
  title: string;
  description: string;
  buttonsLabel: string;
};

const SLIDER_CLASSNAMES = [
  'slider1',
  'slider2',
  'slider3',
  'slider4',
  'slider5',
];

const SliderItem: FC<{ data: SliderItemProps; index: number }> = ({
  data,
  index,
}) => {
  const Icon = data.Icon;
  return (
    <div className={cn('slider', SLIDER_CLASSNAMES[index])}>
      <div className="slider-image__wrapper">
        <Icon className="slide-image" role="img" aria-label="giraffe" />
      </div>

      <div className="slider-info_wrapper">
        <div className="slider-text__wrapper">
          <h2 className="slider-title">{data.title}</h2>
          <p className="slider-description">{data.description}</p>
        </div>

        <button className="slider-item__button" type="button">
          {data.buttonsLabel}
        </button>
      </div>
    </div>
  );
};

export default SliderItem;
