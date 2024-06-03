// components/Modal.tsx
import React from "react";
import { Button } from "./button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, children }) => {
  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "block" : "hidden"
      } bg-black bg-opacity-50 z-50 flex items-center justify-center`}
      onClick={toggleModal}
    >
      <div
        className="relative modal-content bg-background rounded-lg p-4 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-close absolute top-0 right-0 mt-2 mr-2 text-gray-500 cursor-pointer"
          onClick={toggleModal}
        >
          <Button variant="ghost" className="p-2">
            <CloseOutlinedIcon />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
