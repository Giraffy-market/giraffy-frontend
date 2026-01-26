'use client';

import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

import Giraffy1 from './assets/giraffe-about-1.svg';
import Giraffy2 from './assets/giraffe-about-2.svg';
import Giraffy3 from './assets/giraffe-about-3.svg';

import './styles/AboutPage.scss';

import TextContent from '../../components/common/TextContent/TextContent';
import { data } from '../../shared/mock/about.data';

const images = [Giraffy1, Giraffy2, Giraffy3];

const AboutPage = () => (
  <div className="about-page">
    <div className="about-page__content">
      <SectionTitle title="Про Giraffy" />
      {data.map((item, index) => (
        <TextContent
          key={index}
          image={images[index]}
          isReversed={item.isReversed}
        >
          {item.content}
        </TextContent>
      ))}
    </div>
  </div>
);

export default AboutPage;
