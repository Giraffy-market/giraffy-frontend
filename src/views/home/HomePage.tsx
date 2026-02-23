'use client';

import { Categories } from '@/modules/categories';

import { Slider } from '@/components/common/Slider';

import './HomePage.scss';

const HomePage = () => (
  <div className="home-page">
    <div className="home-page__content">
      <Slider />

      <section>
        <Categories />
      </section>
    </div>
  </div>
);

export default HomePage;
