import { FC } from 'react';

import ShowPasswordUnchecked from './assets/show-password-unchecked.svg';

export const Input: FC = () => {
  return (
    <>
      <ShowPasswordUnchecked />
      <input type="password" />
    </>
  );
};
