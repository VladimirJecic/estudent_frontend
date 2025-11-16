import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "@/assets/componentCSS/DialogWrapper.css";
import Button from "./Button";

interface DialogWrapperProps {
  isVisible: boolean;
  title: string;
  width?: number; // in vw
  minHeight?: number; // in vh
  maxHeight?: number; // in vh
  onCloseDialog: () => void;
  children: React.ReactNode;
}

function DialogWrapper({
  isVisible,
  title,
  width = 50,
  minHeight,
  maxHeight,
  onCloseDialog,
  children,
}: DialogWrapperProps) {
  if (!isVisible) return null;

  useEffect(() => {
    // Disable scroll on body when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const modalContent = (
    <div className="modal d-flex">
      <div className="modal-backdrop show"></div>
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          width: `${width}vw`,
          minHeight: minHeight !== undefined ? `${minHeight}vh` : "auto",
          maxHeight: maxHeight !== undefined ? `${maxHeight}vh` : "none",
          zIndex: 1060,
          margin: "auto",
        }}
      >
        <div className="modal-content w-100">
          <div className="modal-header flex-row pe-4">
            <h5 className="modal-title">{title}</h5>
            <Button
              icon="fa fa-times"
              onClick={onCloseDialog}
              buttonSize="2.3rem"
              className="btn-close-dialog"
            />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default DialogWrapper;
