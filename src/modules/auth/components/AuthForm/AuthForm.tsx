import type { FC, ReactNode } from 'react';

import './AuthForm.scss';

type AuthFormProps = {
  children: ReactNode;
  title: string;
};

const AuthForm: FC<AuthFormProps> = ({ children, title }) => {
  return (
    <div className="auth-wrapper">
      <h2 className="auth-title">{title}</h2>
      {children}
    </div>
  );
};

export default AuthForm;
