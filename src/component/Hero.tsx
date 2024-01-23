import logo from "../assets/logo/logo-dark.png";
import SpaceBackground from "./SpaceBackground";

function Hero() {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <SpaceBackground />
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col gap-4 ">
          {/* logo */}
          <img src={logo} alt="codenito logo" className="w-[40%]" />
          {/* kalimat */}
          <h1 className="text-5xl font-bold">
            Elevate Your Digital Presence with Expert IT Consulting
          </h1>
          <p className="text-2xl">
            Specializing in Web Development, Maintenance,Bug Resolution, and
            UI/UX Design
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
