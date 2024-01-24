import logo from "../assets/logo/logo-dark.png";
import SpaceBackground from "./SpaceBackground";

function Hero() {
  return (
    <div id="home" className=" min-h-screen flex items-center justify-center">
      <SpaceBackground />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-4 ">
          {/* logo */}
          <img src={logo} alt="codenito logo" className="md:w-[40%] w-[70%]" />
          {/* kalimat */}
          <h1 className="md:text-5xl text-3xl font-bold">
            Elevate Your Digital Presence with Expert IT Consulting
          </h1>
          <p className="md:text-2xl text-xl">
            Specializing in Web Development, Maintenance, Developer, and UI/UX
            Design
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
