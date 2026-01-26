'use client';

import './TextListItem.scss';

interface DescProps {
  subTitle: string;
  subDesc: string[];
}

interface TextListItemContent {
  title: string;
  desc: (string | DescProps)[];
}

interface TextListItemProps {
  data: TextListItemContent;
}

const TextListItem = ({ data }: TextListItemProps) => (
  <div>
    <li key={`term-${data}`} className="text-list__item">
      <p className="text-list__title">{data.title}</p>

      {data.desc && data.desc.length > 0 && (
        <ul className="text-list__sub-list">
          {data.desc.map((descItem, descIdx) => {
            if (typeof descItem === 'string') {
              return <li key={`desc-${descIdx}`}>{descItem}</li>;
            }

            return (
              <li key={`sub-${descIdx}`} className="text-list__sub-item">
                <span>{descItem.subTitle}</span>
                {descItem.subDesc && (
                  <ul className="text-list__nested-list">
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

export default TextListItem;
