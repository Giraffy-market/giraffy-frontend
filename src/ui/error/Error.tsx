'use client';

import { type FC } from 'react';

import Link from 'next/link';

import type { ErrorProps } from './shared/types/ErrorProps';

import './styles/error.scss';

import { Button } from '../button/Button';

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
      <div className="error">
        <div className="error-wrapper">
          <div className="error-image-wrapper">
            <Icon role="img" aria-label="giraffe" />
          </div>

          <div className="error-info-wrapper">
            <h2 className="error-title">
              {titleLines.map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className="error-description ">{description}</p>
            <div className="error-buttons-wrapper">
              {showUpdateButton && refetch && (
                <Button
                  type="button"
                  text="Оновити сторінку"
                  variant="primary"
                  onClick={() => void refetch()}
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
