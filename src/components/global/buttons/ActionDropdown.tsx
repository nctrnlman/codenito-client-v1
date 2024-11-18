import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";

interface ActionDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Actions
          <FaEllipsisV className="ml-2" /> {/* Icon added here */}
        </button>
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false); // Close dropdown after editing
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false); // Close dropdown after deleting
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
