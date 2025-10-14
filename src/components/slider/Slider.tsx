'use client';

import { type FC } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import SliderItem from './ui/SliderItem/SliderItem';

import { SLIDER_DATA } from './constants/sliderData';

import Arrow from './assets/icons/arrow.svg';

import './styles/Slider.scss';

import { useDotButton } from './hooks/useDotButton';

export const Slider: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  ]);
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

      <div className="embla__buttons-wrapper">
        <div className="container">
          <button
            className="embla__button left"
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <Arrow
              className="embla__button-icon"
              role="img"
              aria-label="arrow"
            />
          </button>

          <button
            className="embla__button right"
            type="button"
            onClick={() => emblaApi?.scrollNext()}
          >
            <Arrow
              className="embla__button-icon right"
              role="img"
              aria-label="arrow"
            />
          </button>
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
