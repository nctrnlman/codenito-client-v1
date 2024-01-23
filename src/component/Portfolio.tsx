import { useRef, useEffect } from "react";
import img from "../assets/about/uixux.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Portfolio() {
  // Sample portfolio data
  const portfolioItems = [
    {
      title: "Codenito Website",
      imageUrl: img,
      description:
        "Explore our company website showcasing our services, projects, and expertise.",
      author: {
        name: "Codenito Team",
        avatarUrl: "/img/codenito-logo.jpg",
      },
      date: "Jan 22, 2024",
      websiteLink: "https://www.codenito.com",
    },
    // Add more portfolio items here
    {
      title: "Codenito Website",
      imageUrl: img,
      description:
        "Explore our company website showcasing our services, projects, and expertise.",
      author: {
        name: "Codenito Team",
        avatarUrl: "/img/codenito-logo.jpg",
      },
      date: "Jan 22, 2024",
      websiteLink: "https://www.codenito.com",
    },
    // Add more portfolio items here
    {
      title: "Codenito Website",
      imageUrl: img,
      description:
        "Explore our company website showcasing our services, projects, and expertise.",
      author: {
        name: "Codenito Team",
        avatarUrl: "/img/codenito-logo.jpg",
      },
      date: "Jan 22, 2024",
      websiteLink: "https://www.codenito.com",
    },
    // Add more portfolio items here
    {
      title: "Codenito Website",
      imageUrl: img,
      description:
        "Explore our company website showcasing our services, projects, and expertise.",
      author: {
        name: "Codenito Team",
        avatarUrl: "/img/codenito-logo.jpg",
      },
      date: "Jan 22, 2024",
      websiteLink: "https://www.codenito.com",
    },
    // Add more portfolio items here
    // ...
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Adjust the number of visible slides as needed
    slidesToScroll: 1,
  };

  const YourMenuItemComponent = ({
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
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-8 px-8">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
        title={title}
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        {websiteLink && (
          <a
            href={websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-gray-600 w-15 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Visit
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
    }, 3000); // Adjust the interval time (in milliseconds) as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 flex flex-col  justify-center">
      <div className="flex flex-col gap-10 max-w-7xl justify-around mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Our Work Portfolio</h1>
          <p className="mt-4">
            Explore our showcase of projects, demonstrating our skills and
            expertise.
          </p>
        </div>

        <div className="mt-4">
          <Slider ref={sliderRef} {...settings}>
            {portfolioItems.map((portfolioItem, index) => (
              <div key={index}>
                <YourMenuItemComponent
                  title={portfolioItem.title}
                  imageUrl={portfolioItem.imageUrl}
                  description={portfolioItem.description}
                  websiteLink={portfolioItem.websiteLink}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
