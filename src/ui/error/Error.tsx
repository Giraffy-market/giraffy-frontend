import { type FC } from 'react';

type Props = {
  error: string;
};

const Error: FC<Props> = ({ error }) => {
  return <div>{error}</div>;
};

export default Error;
