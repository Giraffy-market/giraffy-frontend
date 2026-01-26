'use client';

import { CreateTicketForm } from '@/modules/support-tickets';

import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

import { FAQItem } from './ui/FAQItem';

import { data as termsData } from '../../shared/mock/faq.data';
import './FAQPage.scss';

const FAQPage = () => (
  <div className="faq-page">
    <div className="faq-page__content">
      <SectionTitle title="Поширені запитання" />
      <section>
        <ul className="faq-list">
          {termsData.map((item, index) => (
            <div key={`term-${index}`}>
              <FAQItem data={item} />
            </div>
          ))}
        </ul>
      </section>
    </div>
    <CreateTicketForm />
  </div>
);

export default FAQPage;
