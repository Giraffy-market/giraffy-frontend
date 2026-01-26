'use client';

import { type FC } from 'react';

import cn from 'classnames';
import Link from 'next/link';

import type { ErrorProps } from './shared/types/LoadingErrorPageProps';

import './styles/loadingErrorPage.scss';

import { Button } from '../button/Button';

const Error: FC<ErrorProps> = ({
  errorCode,
  Icon,
  title,
  description,
  onRetry,
  showUpdateButton = true,
}) => {
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <div className="container">
      <div className="error">
        <div
          className={cn('error-wrapper', {
            ['error-wrapper--base']: !errorCode,
            ['error-wrapper--code']: errorCode,
          })}
        >
          {Icon && (
            <div className="error-image-wrapper">
              <Icon role="img" aria-label="giraffe" />
            </div>
          )}

          <div className="error-info-wrapper">
            {errorCode && (
              <span className="error-error--code">{errorCode}</span>
            )}

            {titleLines.length > 0 && (
              <h2 className="error-title">
                {titleLines.map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            )}

            <p
              className={cn('error-description', {
                ['error-description--base']: !errorCode,
                ['error-description--code']: errorCode,
              })}
            >
              {description}
            </p>
            <div
              className={cn('error-buttons-wrapper', {
                ['error-buttons-wrapper--code']: errorCode,
              })}
            >
              {showUpdateButton && onRetry && (
                <Button
                  type="button"
                  text="Оновити сторінку"
                  variant="primary"
                  onClick={() => void onRetry()}
                />
              )}
              <Link className="error-link" href="/">
                Повернутися на головну
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
