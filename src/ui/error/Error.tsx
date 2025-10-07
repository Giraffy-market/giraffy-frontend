import { type FC } from 'react';

import Link from 'next/link';

import './styles/error.scss';

import Button from '../button/Button';
import { errorContent } from './data/errorContent';
import { ErrorType } from './shared/types/ErrorType';

const Error: FC<{ type: ErrorType }> = ({ type }) => {
  const safeType: Exclude<ErrorType, null> = (type ?? '500') as Exclude<
    ErrorType,
    null
  >;

  const { titleLines, description, Icon, showUpdateButton } =
    errorContent[safeType];
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
            {showUpdateButton && (
              <Button
                label="Оновити сторінку"
                isUpdate={true}
                onClick={() => window.location.reload()}
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
