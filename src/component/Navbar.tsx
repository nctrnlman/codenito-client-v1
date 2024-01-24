import { useState } from "react";
import logo from "../assets/logo/favicon.png";
import logoDark from "../assets/logo/icon-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      if (menuOpen) {
        closeMenu();
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#151D20]">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-[#151D20] ">
        <a className="text-3xl font-bold leading-none" href="#">
          <img src={logo} alt="logo" className="h-10" />
        </a>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-white p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul
          className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6 ${
            menuOpen ? "" : "hidden"
          }`}
        >
          <li className="text-sm text-white hover:text-gray-500 cursor-pointer">
            <div onClick={() => scrollTo("home")}>Home</div>
          </li>
          <li className="text-sm text-white hover:text-gray-500 cursor-pointer">
            <div onClick={() => scrollTo("about")}>About Us</div>
          </li>
          <li className="text-sm text-white hover:text-gray-500 cursor-pointer">
            <div onClick={() => scrollTo("portfolio")}>Portfolio</div>
          </li>
          <li className="text-sm text-white hover:text-gray-500 cursor-pointer">
            <div onClick={() => scrollTo("review")}>Review</div>
          </li>
          <li className="text-sm text-white hover:text-gray-500 cursor-pointer">
            <div onClick={() => scrollTo("contact")}>Contact</div>
          </li>
        </ul>
        <a
          className="hidden lg:inline-block lg:ml-auto  py-2 px-2  text-sm text-white font-bold rounded-xl transition duration-200"
          href="https://www.instagram.com/username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>

        <a
          className="hidden lg:inline-block py-2 px-2 text-sm text-white font-bold rounded-xl transition duration-200"
          href="https://www.linkedin.com/in/username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>

        <a
          className="hidden lg:inline-block py-2 px-2  text-sm text-white font-bold rounded-xl transition duration-200"
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="lg" />
        </a>
      </nav>
      <div className={`navbar-menu relative z-50 ${menuOpen ? "" : "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <img src={logoDark} alt="logo" className="h-12" />
            </a>
            <button onClick={closeMenu} className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1 sm:mb-0">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded"
                  onClick={() => scrollTo("home")}
                >
                  Home
                </a>
              </li>
              <li className="mb-1 sm:mb-0">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded"
                  onClick={() => scrollTo("about")}
                >
                  About Us
                </a>
              </li>
              <li className="mb-1 sm:mb-0">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded"
                  onClick={() => scrollTo("portfolio")}
                >
                  Portfolio
                </a>
              </li>
              <li className="mb-1 sm:mb-0">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded"
                  onClick={() => scrollTo("review")}
                >
                  Review
                </a>
              </li>
              <li className="mb-1 sm:mb-0">
                <a
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded"
                  onClick={() => scrollTo("contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6 mx-auto justify-center flex">
              <a
                className="  py-2 px-2  text-sm text-black font-bold rounded-xl transition duration-200"
                href="https://www.instagram.com/username"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                className=" py-2 px-2 text-sm text-black font-bold rounded-xl transition duration-200"
                href="https://www.linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>

              <a
                className="py-2 px-2  text-sm text-black font-bold rounded-xl transition duration-200"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </a>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
