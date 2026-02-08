'use client';

import { useEffect } from 'react';

import { useQueryState } from 'nuqs';

import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { VerifyCode } from '../components/VerifyCode/VerifyCode';
import {
  MODAL_CONTENTS,
  StatusModal,
  useModalManager,
} from '@/components/common/UseModalManager';
import type { ModalType } from '@/components/common/UseModalManager/hooks/useModalManager';
import { Popup } from '@/components/ui/Popup/Popup';

import {
  LOGIN_TITLE_KEY,
  REGISTER_TITLE_KEY,
  VERIFY_FORM_TITLE_KEY,
} from '../constants/form-constants';
import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
  VERIFY_FORM_MODAL_KEY,
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
  ];

  const isAuthFormOpen = !!modal && authFormKeys.includes(modal as string);

  const renderAuthForm = () => {
    switch (modal) {
      case LOGIN_FORM_MODAL_KEY:
        return <LoginForm onShowStatus={openModal} />;
      case REGISTER_FORM_MODAL_KEY:
        return <RegisterForm />;
      case VERIFY_FORM_MODAL_KEY:
        return <VerifyCode />;
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
