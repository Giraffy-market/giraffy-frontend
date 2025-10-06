import { type FC } from 'react';

import GiraffeEating from './assets/giraffe-eating.svg';
import Giraffe from './assets/giraffe.svg';

import css from './styles/styles.module.scss';

import Button from '../button/Button';

type Props = {
  type: string;
};

const Error: FC<Props> = ({ type }) => {
  const icon =
    type === 'server' ? (
      <GiraffeEating role="img" aria-label="giraffe" />
    ) : (
      <Giraffe role="img" aria-label="giraffe" />
    );

  return (
    <div className="container">
      <div className={css.wrapper}>
        <div className={css.imageWrapper}>{icon}</div>
        <div className={css.infoWrapper}>
          {type === 'server' ? (
            <>
              <h2 className={css.title}>
                Упс!
                <br />
                Щось пішло не так
              </h2>

              <p className={css.description}>
                Схоже, виникла неочікувана помилка. Ми вже знаємо про це й
                працюємо над виправленням
              </p>

              <div className={css.buttonsWrapper}>
                <Button label="Оновити сторінку" isUpdate={true} />
                <Button label="Повернутися на головну" isHome={true} />
              </div>
            </>
          ) : (
            <div>No content yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
