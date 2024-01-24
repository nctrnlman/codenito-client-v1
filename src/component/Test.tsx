import { useRef, useEffect } from "react";
import ai from "../assets/portfolio/ai.png";
// import hukum from "../assets/portfolio/hukum.png";
import mylaw from "../assets/portfolio/mylaw.png";
// import maa from "../assets/portfolio/maa.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function Test() {
  // Sample Test data
  const TestItems = [
    {
      title: "MyLaw Website",
      imageUrl: mylaw,
      description:
        "Explore our company website showcasing our services, projects, and expertise.",

      websiteLink: "https://www.codenito.com",
    },
    // Add more Test items here
    {
      title: "AI Image Generator ",
      imageUrl: ai,
      description:
        "Explore our company website showcasing our services, projects, and expertise.",

      websiteLink: "https://www.codenito.com",
    },
    // Add more Test items here

    // Add more Test items here
    // ...
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust the number of visible slides as needed
    slidesToScroll: 1,
    centerMode: true,
  };

  const CardComponent = ({
    title,
    imageUrl,
    description,
    websiteLink,
  }: {
    title: string;
    imageUrl: string;
    description: string;
    websiteLink: string;
  }) => (
    <div
      id="Test"
      className="block relative rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mx-4 overflow-hidden"
    >
      <img className="rounded-lg" src={imageUrl} alt={title} />
      <div
        className="absolute bottom-0 p-6 bg-[rgba(0,0,0,0.6)]"
        style={{ width: "100%", backdropFilter: "blur(10px)" }}
      >
        <h5 className="mb-4 text-xl font-medium leading-tight text-white">
          {title}
        </h5>
        <p className="mb-6 text-base text-white">{description}</p>
        {websiteLink && (
          <a
            href={websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 text-black p-3 border-none rounded-md"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );

  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 flex flex-col justify-cente max-w-7xlr">
      <div className="flex flex-col gap-10  max-w-7xl mx-auto justify-around">
        <div className="mt-4 bg-slate-600">
          <Slider ref={sliderRef} {...settings}>
            {TestItems.map((TestItem, index) => (
              <div key={index}>
                <CardComponent
                  title={TestItem.title}
                  imageUrl={TestItem.imageUrl}
                  description={TestItem.description}
                  websiteLink={TestItem.websiteLink}
                />
              </div>
              // <h1>asdasdasdas</h1>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Test;
