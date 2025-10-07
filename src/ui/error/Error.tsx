import { type FC } from 'react';

import Link from 'next/link';

import './styles/error.scss';

import Button from '../button/Button';
import { ErrorProps } from './shared/types/ErrorProps';

const Error: FC<ErrorProps> = ({
  Icon,
  title,
  description,
  refetch,
  showUpdateButton = true,
}) => {
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <div className="container">
      <div className="wrapper">
        <div className="imageWrapper">
          <Icon role="img" aria-label="giraffe" />
        </div>

        <div className="infoWrapper">
          <h2 className="title">
            {titleLines.map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p className="description">{description}</p>
          <div className="buttonsWrapper">
            {showUpdateButton && refetch && (
              <Button
                label="Оновити сторінку"
                isUpdate={true}
                onClick={() => void refetch()}
              />
            )}
            <Link className="goHomeLink" href="/">
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
