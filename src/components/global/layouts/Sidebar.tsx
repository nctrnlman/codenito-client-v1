import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../../../assets/logo/logo-dark.png";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTags,
  AiOutlineCalendar,
  AiOutlinePaperClip,
  AiOutlineDown,
  AiOutlineRight,
} from "react-icons/ai";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [clientManagementOpen, setClientManagementOpen] = useState(false);

  const toggleClientManagement = () => {
    setClientManagementOpen(!clientManagementOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen my-2 mx-4 rounded-3xl bg-white border border-black p-4 shadow-lg">
      <section className="mb-10 flex justify-center">
        <a className="text-3xl font-bold leading-none" href="#">
          <img src={logoDark} alt="logo" className="h-10" />
        </a>
      </section>
      <ul className="space-y-4">
        <li>
          <Link
            to="/ims/dashboard"
            className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/dashboard"
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            <AiOutlineDashboard className="text-xl" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/ims/ticketing"
            className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/ticketing"
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            <AiOutlineTags className="text-xl" />
            <span>Ticketing</span>
          </Link>
        </li>
        <li>
          <div
            className={`text-gray-800 px-3 py-2 flex items-center justify-between rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
              location.pathname.startsWith("/ims/client-management")
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
            onClick={toggleClientManagement}
          >
            <div className="flex items-center space-x-2">
              <AiOutlineUser className="text-xl" />
              <span>Client Management</span>
            </div>
            {clientManagementOpen ? <AiOutlineDown /> : <AiOutlineRight />}
          </div>
          {clientManagementOpen && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link
                  to="/ims/client-management/list"
                  className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
                    location.pathname === "/ims/client-management/list"
                      ? "border border-black font-bold"
                      : "hover:bg-gray-200 hover:font-bold"
                  }`}
                >
                  <span>Client List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ims/client-management/add"
                  className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
                    location.pathname === "/ims/client-management/add"
                      ? "border border-black font-bold"
                      : "hover:bg-gray-200 hover:font-bold"
                  }`}
                >
                  <span>Add Client</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ims/client-management/reports"
                  className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
                    location.pathname === "/ims/client-management/reports"
                      ? "border border-black font-bold"
                      : "hover:bg-gray-200 hover:font-bold"
                  }`}
                >
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ims/client-management/invoice"
                  className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
                    location.pathname === "/ims/client-management/invoice"
                      ? "border border-black font-bold"
                      : "hover:bg-gray-200 hover:font-bold"
                  }`}
                >
                  <span>Invoice Generator</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/ims/calendar"
            className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/calendar"
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            <AiOutlineCalendar className="text-xl" />
            <span>Calendar</span>
          </Link>
        </li>
        <li>
          <Link
            to="/ims/sticky-notes"
            className={`text-gray-800 px-3 py-2 flex items-center space-x-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/sticky-notes"
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            <AiOutlinePaperClip className="text-xl" />
            <span>Notes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;