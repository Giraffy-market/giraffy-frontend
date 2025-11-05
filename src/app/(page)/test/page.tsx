import { type FC } from 'react';

import { getServerAuthSession } from '@/modules/auth/configs/AuthConfig';

import { TestClient } from './TestClient';

const Test: FC = async () => {
  const session = await getServerAuthSession();
  console.log(session);

  return <TestClient session={session} />;
};

export default Test;
