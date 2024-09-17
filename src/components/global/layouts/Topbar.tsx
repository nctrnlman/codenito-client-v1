import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, getUser } from "../../../utils/indexedDBHelper";
import { toast } from "react-toastify";

const Topbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast.success("Success Logout");
      await clearUser();
      navigate("/ims/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Ambil user ID dari localStorage
      if (userId) {
        const storedUser = await getUser(userId); // Gunakan user ID untuk mengambil data pengguna dari IndexedDB
        if (storedUser) {
          setUserData({ name: storedUser.name, email: storedUser.email });
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
            {userData && (
              <div className="border-b-2 px-4 py-2 text-sm">
                <p className="font-bold">{userData.name}</p>
                <p className="">{userData.email}</p>
              </div>
            )}
            <a
              className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
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
