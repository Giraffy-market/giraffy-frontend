type CloseModalProps = {
  setModal: (value: string | null) => void;
  setEmail: (value: string | null) => void;
};

export const closeModal = ({ setModal, setEmail }: CloseModalProps) => {
  setModal(null);
  setEmail(null);
};
