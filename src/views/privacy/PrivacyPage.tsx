'use client';

import TextListItem from '@/components/common/TextListItem/TextListItem';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

import { data as privacyData } from '../../shared/mock/privacy.data';
import './PrivacyPage.scss';

const PrivacyPage = () => (
  <div className="privacy-page">
    <div className="privacy-page__content">
      <SectionTitle title=" Політика конфіденційності" />
      <section>
        <ul className="privacy-list">
          {privacyData.map((item, index) => (
            <TextListItem key={`privacy-${index}`} data={item} />
          ))}
        </ul>
      </section>
    </div>
  </div>
);

export default PrivacyPage;
