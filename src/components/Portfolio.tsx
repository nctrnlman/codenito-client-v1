import { useRef, useEffect } from "react";
import ai from "../assets/portfolio/ai.png";
import hukum from "../assets/portfolio/hukum.png";
import mylaw from "../assets/portfolio/mylaw.png";
import maa from "../assets/portfolio/maa.png";
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
        "Explore our company website showcasing our services, projects, and expertise in the field of law.",
      websiteLink: "https://mylaw.id/",
    },
    {
      title: "AI Image Generator",
      imageUrl: ai,
      description:
        "Discover our company website featuring our services, projects, and expertise in artificial intelligence-based image generation.",
      websiteLink: "https://ai-image-generator-inky-rho.vercel.app/",
    },
    {
      title: "E-Hukum UI/UX Design",
      imageUrl: hukum,
      description:
        "Explore the user interface and user experience (UI/UX) design for E-Hukum, showcasing our design services, projects, and expertise.",
      websiteLink:
        "https://www.figma.com/proto/hCxGZMuKwjEyT7O3LE0XpJ/Untitled?page-id=101%3A561&type=design&node-id=445-943&viewport=277%2C89%2C0.46&t=3VLYgBJQRGFTWK1g-1&scaling=scale-down&mode=design",
    },
    {
      title: "MAA Website",
      imageUrl: maa,
      description:
        "Explore our company website highlighting our services, projects, and expertise across various fields for MAA Group.",
      websiteLink: "https://maagroup.co.id/",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
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
    <div className="block relative rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mx-4 overflow-hidden">
      <div
        className="rounded-lg bg-cover bg-center w-full h-64 md:h-80"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div
        className="absolute bottom-0 p-6 bg-[rgba(0,0,0,0.6)]"
        style={{ width: "100%", backdropFilter: "blur(10px)" }}
      >
        <h5 className="mb-4 md:text-xl font-medium leading-tight text-white">
          {title}
        </h5>
        <p className="mb-6 md:text-base text-white">{description}</p>
        {websiteLink && (
          <a
            href={websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 text-black p-[10px] md:p-3 border-none rounded-md"
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
    <div
      id="portfolio"
      className="py-20 flex flex-col justify-center md:mx-auto max-w-7xl"
    >
      <div className="text-center px-[10px] md:px-0">
        <h1 className="md:text-5xl text-3xl font-bold">Our Work Portfolio</h1>
        <p className="md:text-xl md:pt-4 pt-2 mt-4 mb-4">
          Explore our showcase of projects, demonstrating our skills and
          expertise.
        </p>
      </div>
      <div className="mt-4 ">
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
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Test;
