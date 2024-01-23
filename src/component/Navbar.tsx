import logo from "../assets/logo/favicon.png";

function Navbar() {
  return (
    <div className="bg-[#151D20]">
      <div className="flex items-center justify-end ">
        {/* navigation */}
        <div className="text-white flex gap-5">
          <button>Home</button>
          <button>About</button>
          <button>Review</button>
          <button>Contact</button>
        </div>
        {/* //logo */}
        <div className="">
          <img src={logo} alt="codenito logo" className="w-40" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
