import { Suspense } from 'react';

import { Categories } from '@/modules/categories';
import { HeaderPopup } from '@/modules/header/header-popup/HeaderPopup';
import { Products } from '@/modules/products';

import { Slider } from '@/components/slider/Slider';

import { Loader } from '@/ui/loader/Loader';
import { Logo } from '@/ui/logo/Logo';

import './home-page.scss';

const HomePage = () => (
  <div className="home-page">
    <header className="header container">
      <Logo />
      <HeaderPopup />
    </header>

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
