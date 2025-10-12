import { type FC } from 'react';

import { getServerAuthSession } from '@/modules/auth/configs/AuthConfig';

const Test: FC = async () => {
  const session = await getServerAuthSession();

  console.log(session);

  return <div>Welcome to the Test Page {session?.access_token}</div>;
};

export default Test;
