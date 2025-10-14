'use client';

import { type FC } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import SliderItem from './ui/SliderItem/SliderItem';

import { SLIDER_DATA } from './constants/sliderData';

import './styles/Slider.scss';

import { useDotButton } from './hooks/useDotButton';

export const Slider: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDER_DATA.map((data, i) => (
            <SliderItem key={data.id} data={data} index={i} />
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </section>
  );
};
