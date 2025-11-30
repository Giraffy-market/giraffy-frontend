'use client';

import { Categories } from '@/modules/categories';
import { Products } from '@/modules/products';

import { Slider } from '@/components/slider/Slider';

import './home-page.scss';

const HomePage = () => (
  <div className="home-page">
    <div className="home-page__content">
      <Slider />

      <section>
        <Categories />
      </section>

      <section>
        <Products />
      </section>
    </div>
  </div>
);

export default HomePage;
