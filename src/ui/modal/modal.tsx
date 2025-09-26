"use client";

import React, { useEffect, useRef } from "react";
import CloseIcon from "./closeIcon.svg";
import styles from "./Popup.module.scss";
import Image from "next/image";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titleId?: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, titleId }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div
        className={styles.popupContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрити" type="button">
  <Image src={CloseIcon} alt="" width={16} height={16} />
</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;