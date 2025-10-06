import { type FC } from 'react';

import Link from 'next/link';

import css from './styles/styles.module.scss';

import Button from '../button/Button';
import { errorContent } from './data/errorContent';
import { ErrorType } from './shared/types/ErrorType';

const Error: FC<{ type: ErrorType }> = ({ type }) => {
  console.log(type);

  const { titleLines, description, Icon, showUpdateButton } =
    errorContent[type];

  return (
    <div className="container">
      <div className={css.wrapper}>
        {Icon && (
          <div className={css.imageWrapper}>
            <Icon role="img" aria-label="giraffe" />
          </div>
        )}

        <div className={css.infoWrapper}>
          <h2 className={css.title}>
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p className={css.description}>{description}</p>
          <div className={css.buttonsWrapper}>
            {showUpdateButton && (
              <Button label="Оновити сторінку" isUpdate={true} />
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
