type SwitchModalProps = {
  setModal: (value: string | null) => void;
  setEmail: (value: string | null) => void;
  to: string;
};

export const switchModal = ({ setModal, setEmail, to }: SwitchModalProps) => {
  setModal(null);
  setEmail(null);
  setTimeout(() => {
    setModal(to);
  }, 100);
};
