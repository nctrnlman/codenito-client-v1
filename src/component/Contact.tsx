import { useState, FormEvent } from "react";
import SpaceBackground from "./SpaceBackground";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Your form submission logic here
    console.log("Form submitted:", { name, email, message });
  };

  return (
    <div id="contact" className="min-h-screen flex flex-col  justify-center">
      <div>
        <div className="flex-1 items-center w-3/4 p-6 mx-auto">
          <h1 className="text-5xl font-bold inline border-b-4 border-grey text-black">
            Let’s discuss
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-center bg-url(<path-to-image>) bg-cover bg-center border border-white rounded-lg backdrop-blur-md relative">
          <SpaceBackground />
          <div
            className="absolute inset-0 bg-url(<path-to-grain-image>) opacity-10"
            style={{ pointerEvents: "none" }}
          ></div>
          <form className="w-3/4 p-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="text-white text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 w-full"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 w-full"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="text-white text-lg">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 w-full h-32"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#505050] hover:bg-[#434343] text-white rounded-md py-2 px-4 text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
