import React from "react";
import BaseModal from "./BaseModal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  title,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete"
      onConfirm={onDelete}
      confirmText="Delete"
    >
      <p>Are you sure you want to delete the ticket "{title}"?</p>
    </BaseModal>
  );
};

export default DeleteModal;
