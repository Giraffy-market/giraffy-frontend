'use client';

import TextListItem from '@/components/common/TextListItem/TextListItem';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

import { data as termsData } from '../../shared/mock/legal-terms.data';
import './LegalTermsPage.scss';

const LegalTermsPage = () => (
  <div className="legal-terms-page">
    <div className="legal-terms-page__content">
      <SectionTitle title="Умови надання послуг" />
      <section>
        <ul className="terms-list">
          {termsData.map((item, index) => (
            <TextListItem key={`term-${index}`} data={item} />
          ))}
        </ul>
      </section>
    </div>
  </div>
);

export default LegalTermsPage;
