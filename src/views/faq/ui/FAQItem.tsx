import { useEffect, useRef, useState } from 'react';

import ExpandDownLight from './assets/Expand_down_light.svg';

import '../FAQPage.scss';

interface DescProps {
  subTitle: string;
  subDesc: string[];
}

interface FAQItemProps {
  title: string;
  desc: DescProps[];
}

interface FAQData {
  data: FAQItemProps;
}

export const FAQItem = ({ data }: FAQData) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const contentRef = useRef<HTMLUListElement>(null);

  const toggleDescription = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div>
      <li className="faq-list__item">
        <div className="faq-list__title">
          <p style={{ maxWidth: '90%' }}>{data.title}</p>
          <div
            className={`open-cursor ${isOpen ? 'open-cursor--open' : 'open-cursor--closed'}`}
            onClick={toggleDescription}
          >
            <ExpandDownLight />
          </div>
        </div>

        {data.desc && data.desc.length > 0 && (
          <ul
            ref={contentRef}
            className="faq-list__sub-list "
            style={{
              maxHeight: isOpen ? `${height}px` : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}
          >
            {data.desc.map((descItem, descIdx) => {
              if (typeof descItem === 'string') {
                return <li key={`desc-${descIdx}`}>{descItem}</li>;
              }

              return (
                <li key={`sub-${descIdx}`} className="faq-list__sub-item">
                  <strong>{descItem.subTitle}</strong>
                  {descItem.subDesc && (
                    <ul className="faq-list__nested-list">
                      {descItem.subDesc.map((subText, subIdx) => (
                        <li key={`text-${subIdx}`}>{subText}</li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </div>
  );
};
