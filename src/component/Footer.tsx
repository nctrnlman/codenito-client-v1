import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo/logo-light.png";

function Footer() {
  return (
    <div>
      <footer className="p-10 bg-black text-white flex justify-around">
        <aside>
          <img src={logo} alt="" />
          <p className="pt-4">
            Codenito.
            <br />
            Providing reliable tech since 2023
          </p>
        </aside>
        <nav className="mt-4">
          <header className="text-lg font-semibold">Services</header>
          <a className="block py-1 hover:underline">Web Development</a>
          <a className="block py-1 hover:underline">Web Maintenance</a>
          <a className="block py-1 hover:underline">Freelance Developer</a>
          <a className="block py-1 hover:underline">UI/UX Design</a>
        </nav>
        <nav className="mt-4">
          <header className="text-lg font-semibold">Company</header>
          <a className="block py-1 hover:underline">About us</a>
          <a className="block py-1 hover:underline">Contact</a>
          <a className="block py-1 hover:underline">Jobs</a>
          <a className="block py-1 hover:underline">Press kit</a>
        </nav>
        <nav className="mt-4 ">
          <header className="text-lg font-semibold ">Social</header>
          <div className="flex flex-row gap-4">
            <a
              className="block py-1 hover:underline"
              href="link-to-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              className="block py-1 hover:underline"
              href="link-to-youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              className="block py-1 hover:underline"
              href="link-to-instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
