'use client';

import TextContent from '@/components/common/TextContent/TextContent';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

// import AboutContent from './ui/AboutContent/AboutContent';

import Giraffy from './assets/giraffe-support-1.svg';

import { data } from '../../shared/mock/support.data';
import './SupportPage.scss';

const SupportPage = () => (
  <div className="support-page">
    <div className="support-page__content">
      <SectionTitle title="Підтримка Giraffy" />
      {data.map((item, index) => (
        <TextContent key={index} image={Giraffy} mobileReverse={true}>
          {item.content}
        </TextContent>
      ))}
    </div>
  </div>
);

export default SupportPage;
