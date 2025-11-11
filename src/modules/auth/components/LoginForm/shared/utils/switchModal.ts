type SwitchModalProps = {
  setModal: (value: string | null) => void;
  to: string;
};

export const switchModal = ({ setModal, to }: SwitchModalProps) => {
  setModal(null);
  setTimeout(() => {
    setModal(to);
  }, 100);
};
