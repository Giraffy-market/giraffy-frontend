import { Suspense } from 'react';

import { Categories } from '@/modules/categories';
import { Products } from '@/modules/products';

import { Slider } from '@/components/slider/Slider';

import { Loader } from '@/ui/loader/Loader';

import './home-page.scss';

const HomePage = () => (
  <div className="home-page">
    <div className="home-page__content">
      <Slider />

      <section>
        <Categories />
      </section>

      <section>
        <Suspense fallback={<Loader />}>
          <Products />
        </Suspense>
      </section>
    </div>
  </div>
);

export default HomePage;
