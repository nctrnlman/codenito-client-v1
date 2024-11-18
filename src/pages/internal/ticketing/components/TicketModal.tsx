import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import BaseModal from "../../../../components/global/modals/BaseModal";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ticket: any) => void;
  initialData?: any;
}

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "");
  const [attachment, setAttachment] = useState(initialData?.attachment || "");
  const [picName, setPicName] = useState(initialData?.pic.name || "");
  const [requestorName, setRequestorName] = useState(
    initialData?.requestor.name || ""
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setStatus(initialData?.status || "");
    setAttachment(initialData?.attachment || "");
    setPicName(initialData?.pic.name || "");
    setRequestorName(initialData?.requestor.name || "");
  }, [initialData]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    picName: Yup.string().required("PIC Name is required"),
    requestorName: Yup.string().required("Requestor Name is required"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ticketData = {
      title,
      description,
      status,
      attachment,
      pic: { name: picName },
      requestor: { name: requestorName },
    };

    try {
      await validationSchema.validate(ticketData, { abortEarly: false });
      onSave(ticketData);
      onClose();
    } catch (validationErrors) {
      const formattedErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Ticket" : "Add Ticket"}
    >
      <form onSubmit={handleSubmit}>
        {/* Form fields for title, description, status, attachment, picName, and requestorName */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.status ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.status && (
            <p className="text-red-500 text-xs">{errors.status}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachment
          </label>
          <input
            type="text"
            value={attachment}
            onChange={(e) => setAttachment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            PIC Name
          </label>
          <input
            type="text"
            value={picName}
            onChange={(e) => setPicName(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.picName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.picName && (
            <p className="text-red-500 text-xs">{errors.picName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Requestor Name
          </label>
          <input
            type="text"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            className={`mt-1 block w-full border ${
              errors.requestorName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
          {errors.requestorName && (
            <p className="text-red-500 text-xs">{errors.requestorName}</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Save
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default TicketModal;
