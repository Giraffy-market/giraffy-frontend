'use client';

import { useEffect } from 'react';

import { useQueryState } from 'nuqs';

import { ForgotPasswordForm } from '../components/ForgotPasswordForm/ForgotPasswordForm';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { ResetPasswordForm } from '../components/ResetPasswordForm/ResetPasswordForm';
import { VerifyCode } from '../components/VerifyCode/VerifyCode';
import {
  MODAL_CONTENTS,
  StatusModal,
  useModalManager,
} from '@/components/common/UseModalManager';
import type { ModalType } from '@/components/common/UseModalManager/hooks/useModalManager';
import { Popup } from '@/components/ui/Popup/Popup';

import {
  FORGOT_PASSWORD_TITLE_KEY,
  LOGIN_TITLE_KEY,
  REGISTER_TITLE_KEY,
  RESET_PASSWORD_TITLE_KEY,
  VERIFY_FORM_TITLE_KEY,
} from '../constants/form-constants';
import {
  FORGOT_PASSWORD_MODAL_KEY,
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
  RESET_PASSWORD_MODAL_KEY,
  VERIFY_ACTION_KEY,
  VERIFY_FORM_MODAL_KEY,
  type VerifyAction,
} from '../constants/modal-constants';

import './AuthFormLayout.scss';

export const AuthFormLayout = () => {
  const [modal, setModal] = useQueryState(MODAL_QUERY_STATE);
  const { activeModal, closeModal, openModal } = useModalManager();

  useEffect(() => {
    if (modal && modal in MODAL_CONTENTS) {
      openModal(modal as ModalType);
      setModal(null);
    }
  }, [modal, openModal, setModal]);

  const currentContent = activeModal ? MODAL_CONTENTS[activeModal] : null;

  const authFormKeys = [
    LOGIN_FORM_MODAL_KEY,
    REGISTER_FORM_MODAL_KEY,
    VERIFY_FORM_MODAL_KEY,
    FORGOT_PASSWORD_MODAL_KEY,
    RESET_PASSWORD_MODAL_KEY,
  ];

  const isAuthFormOpen = !!modal && authFormKeys.includes(modal as string);

  const [verifyAction] = useQueryState(VERIFY_ACTION_KEY);

  const renderAuthForm = () => {
    switch (modal) {
      case LOGIN_FORM_MODAL_KEY:
        return <LoginForm />;
      case REGISTER_FORM_MODAL_KEY:
        return <RegisterForm />;
      case FORGOT_PASSWORD_MODAL_KEY:
        return <ForgotPasswordForm />;
      case RESET_PASSWORD_MODAL_KEY:
        return <ResetPasswordForm />;
      case VERIFY_FORM_MODAL_KEY:
        return (
          <VerifyCode
            action={verifyAction as VerifyAction}
            onShowStatus={openModal}
          />
        );
      default:
        return null;
    }
  };

  const renderFormTitle = () => {
    switch (modal) {
      case LOGIN_FORM_MODAL_KEY:
        return LOGIN_TITLE_KEY;
      case REGISTER_FORM_MODAL_KEY:
        return REGISTER_TITLE_KEY;
      case VERIFY_FORM_MODAL_KEY:
        return VERIFY_FORM_TITLE_KEY;
      case FORGOT_PASSWORD_MODAL_KEY:
        return FORGOT_PASSWORD_TITLE_KEY;

      case RESET_PASSWORD_MODAL_KEY:
        return RESET_PASSWORD_TITLE_KEY;
      default:
        return null;
    }
  };

  return (
    <>
      <Popup isOpen={isAuthFormOpen} onClose={() => setModal(null)}>
        <h2 className="title">{renderFormTitle()}</h2>
        {renderAuthForm()}
      </Popup>
      {currentContent && (
        <StatusModal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={currentContent.title}
          description={currentContent.description}
          buttonText={currentContent.buttonText}
        />
      )}
    </>
  );
};
