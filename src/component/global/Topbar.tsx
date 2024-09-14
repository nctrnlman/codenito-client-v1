import React, { useState } from "react";

const Topbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed top-0 left-72 w-[calc(100%-19rem)] h-16 rounded-3xl mt-2 bg-black text-white flex items-center justify-between px-4 shadow-md z-50">
      <h2 className="text-lg font-semibold">Internal Management System</h2>

      <div className="relative">
        <div
          className="cursor-pointer flex items-center space-x-2"
          onClick={toggleDropdown}
        >
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" // Bisa diganti dengan link gambar lain
            alt="Profile"
            className="rounded-full w-8 h-8"
          />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-gray-800">
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                console.log("Logging out...");
              }}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
