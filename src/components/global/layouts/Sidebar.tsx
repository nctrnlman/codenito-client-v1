import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../../../assets/logo/logo-dark.png";

const Sidebar: React.FC = () => {
  const location = useLocation();

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
            className={`text-gray-800 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/dashboard"
                ? "border border-black  font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/ims/ticketing"
            className={`text-gray-800 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/ticketing"
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            Ticketing
          </Link>
        </li>
        <li>
          <Link
            to="/ims/client-management"
            className={`text-gray-800 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out ${
              location.pathname === "/ims/client-management"
                ? "border border-black font-bold"
                : "hover:bg-gray-200 hover:font-bold"
            }`}
          >
            Client Management
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
