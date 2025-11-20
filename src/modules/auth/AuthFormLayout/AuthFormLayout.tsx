'use client';

import { useQueryState } from 'nuqs';

import { LoginForm } from '../components/LoginForm';

import { Popup } from '@/ui/Popup/Popup';

import {
  LOGIN_FORM_MODAL_KEY,
  LOGIN_TITLE_KEY,
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
} from '../constants';
import './AuthFormLayout.scss';

export const AuthFormLayout = () => {
  const [modal, setModal] = useQueryState(MODAL_QUERY_STATE);

  const renderAuthForm = () => {
    switch (modal) {
      case LOGIN_FORM_MODAL_KEY:
        return <LoginForm />;
      case REGISTER_FORM_MODAL_KEY:
        return <div>test</div>;
      default:
        return null;
    }
  };

  const renderFormTitle = () => {
    switch (modal) {
      case LOGIN_FORM_MODAL_KEY:
        return LOGIN_TITLE_KEY;
      default:
        return null;
    }
  };

  const isOpen =
    modal === LOGIN_FORM_MODAL_KEY || modal === REGISTER_FORM_MODAL_KEY;

  return (
    <Popup isOpen={isOpen} onClose={() => setModal(null)}>
      <h2 className="title">{renderFormTitle()}</h2>
      {renderAuthForm()}
    </Popup>
  );
};
