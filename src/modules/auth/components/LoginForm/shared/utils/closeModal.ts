type CloseModalProps = {
  setModal: (value: string | null) => void;
};

export const closeModal = ({ setModal }: CloseModalProps) => {
  setModal(null);
};
