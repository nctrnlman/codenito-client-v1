import webDev from "../assets/about/web-dev.jpg";
import webMain from "../assets/about/web-main.jpg";
import freelance from "../assets/about/freelance-dev.jpg";
import uiux from "../assets/about/uixux.jpg";
import logo from "../assets/logo/logo-light.png";

function About() {
  const cardData = [
    {
      image: webDev,
      title: "Web Development",
      description:
        "Unlock the power of the web with our comprehensive web development services. From crafting interactive user interfaces to building robust backend systems, we bring your digital vision to life.",
      tags: ["#webdev", "#coding", "#development"],
    },
    {
      image: webMain,
      title: "Web Maintenance",
      description:
        "Ensure your online presence stays flawless with our dedicated web maintenance services. We handle updates, provide support, and perform routine checks to keep your website running smoothly.",
      tags: ["#maintenance", "#updates", "#support"],
    },
    {
      image: freelance,
      title: "Freelance Developer",
      description:
        "Hire our skilled freelance developers for your project needs. Whether it's coding, troubleshooting, or bringing fresh ideas to the table, our freelancers are ready to make your vision a reality.",
      tags: ["#freelance", "#developer", "#coding"],
    },
    {
      image: uiux,
      title: "UI/UX Design",
      description:
        "Craft visually stunning and user-friendly interfaces with our UI/UX design expertise. We focus on creating engaging experiences that captivate users and elevate your digital presence.",
      tags: ["#uiux", "#design", "#userexperience"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#DCDCDC] flex items-center justify-center mx-auto">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold r mt-8">
            Welcome to
            <img
              src={logo} // Replace with the actual path to your logo image
              alt="Codenito Logo"
              className="inline ml-4" // Adjust the margin as needed
            />
          </h1>
          <h4 className="text-xl pt-4">
            We leverage cutting-edge technology to empower businesses with
            superior user experiences. Our experienced team ensures industry
            leadership and data security, creating a new digital landscape where
            code meets incognito. Explore the Possibilities with{" "}
            <span className="font-bold">Codenito</span>
          </h4>
        </div>

        <div className="flex flex-wrap justify-center mt-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="max-w-sm m-4 rounded overflow-hidden shadow-lg bg-white"
            >
              <img
                className="w-full h-48 object-cover" // Set a fixed height with zoom effect
                src={card.image}
                alt={`Card ${index + 1}`}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.title}</div>
                <p className="text-gray-700 text-base">{card.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {card.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
