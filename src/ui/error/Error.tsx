import { type FC } from 'react';

import Link from 'next/link';

import css from './styles/styles.module.scss';

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
      <div className={css.wrapper}>
        <div className={css.imageWrapper}>
          <Icon role="img" aria-label="giraffe" />
        </div>

        <div className={css.infoWrapper}>
          <h2 className={css.title}>
            {titleLines.map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p className={css.description}>{description}</p>
          <div className={css.buttonsWrapper}>
            {showUpdateButton && (
              <Button
                label="Оновити сторінку"
                isUpdate={true}
                onClick={() => window.location.reload()}
              />
            )}
            <Link className={css.goHomeLink} href="/">
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
