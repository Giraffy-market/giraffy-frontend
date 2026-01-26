import { type FC } from 'react';

import './styles/sectionTitle.scss';

const SectionTitle: FC<{ title: string }> = ({ title }) => {
  return <h2 className="title">{title}</h2>;
};

export default SectionTitle;
