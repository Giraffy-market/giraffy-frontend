import { signIn } from 'next-auth/react';

// import { mockRequest } from '@/shared/mock/mockRequest';

type HandleLoginProps = {
  email: string;
  password: string;
};

export const handleLoginAction = async (data: HandleLoginProps) => {
  const result = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;

  //FAKE TEST
  // return await mockRequest(data);
};
