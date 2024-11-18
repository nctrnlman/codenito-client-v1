import { useRef, useEffect } from "react";
import ai from "../assets/portfolio/ai.png";
import hukum from "../assets/portfolio/hukum.png";
import mylaw from "../assets/portfolio/mylaw.png";
import cla from "../assets/portfolio/cla.png";
import manpower from "../assets/portfolio/manpower.jpeg";
import jahra from "../assets/portfolio/jahra.png";
import dije from "../assets/portfolio/dije.png";
import smsv1 from "../assets/portfolio/smsv1.png";
import smsv2 from "../assets/portfolio/smsv2.png";
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
        "Explore MyLaw's official website, offering comprehensive legal services, project insights, and expert advice to assist individuals and businesses with legal matters.",
      websiteLink: "https://mylaw.id/",
    },
    {
      title: "CLA Website",
      imageUrl: cla,
      description:
        "Visit CLA's official website to discover a range of legal services, successful case studies, and a strong focus on providing expert legal support to clients in Indonesia.",
      websiteLink: "https://claindonesia.com/",
    },
    {
      title: "MAA Website",
      imageUrl: maa,
      description:
        "The MAA Group's website showcases its diversified services across multiple industries, from project development to offering high-end professional expertise in business operations.",
      websiteLink: "https://maagroup.co.id/",
    },
    {
      title: "Man Power Supply of DWH Implementation",
      imageUrl: manpower,
      description:
        "Learn about the implementation of the Data Warehouse (DWH) system for Man Power Supply, enhancing data-driven decision-making and improving efficiency across HR and recruitment processes.",
      websiteLink: "",
    },
    {
      title: "Perfect Pallete Website",
      imageUrl: jahra,
      description:
        "Perfect Pallete offers a unique platform for color selection and matching, helping businesses choose the perfect colors for branding, design projects, and more.",
      websiteLink: "",
    },
    {
      title: "Restaurant Management Website",
      imageUrl: dije,
      description:
        "This website supports restaurant management by offering tools for optimizing the restaurant’s daily operations, including menu management, customer service, and order tracking.",
      websiteLink: "",
    },
    {
      title: "Sehat Murni Sejahtera Marketing",
      imageUrl: smsv1,
      description:
        "Explore the marketing platform for Sehat Murni Sejahtera, where AI-driven visual content generation is utilized to promote wellness and health services more effectively.",
      websiteLink: "",
    },
    {
      title: "Sehat Murni Sejahtera Internal System",
      imageUrl: smsv2,
      description:
        "The internal system for Sehat Murni Sejahtera streamlines data management and improves operational efficiency by incorporating AI and automation for health-related services.",
      websiteLink: "",
    },
    {
      title: "AI Image Generator",
      imageUrl: ai,
      description:
        "Check out the AI Image Generator, a cutting-edge tool that creates unique, AI-powered images based on user input. It’s a revolutionary way to produce creative visuals on demand.",
      websiteLink: "https://ai-image-generator-inky-rho.vercel.app/",
    },
    {
      title: "E-Hukum UI/UX Design",
      imageUrl: hukum,
      description:
        "Explore the UI/UX design for the E-Hukum platform, focused on providing a seamless and intuitive experience for users seeking legal assistance and resources online.",
      websiteLink:
        "https://www.figma.com/proto/hCxGZMuKwjEyT7O3LE0XpJ/Untitled?page-id=101%3A561&type=design&node-id=445-943&viewport=277%2C89%2C0.46&t=3VLYgBJQRGFTWK1g-1&scaling=scale-down&mode=design",
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
