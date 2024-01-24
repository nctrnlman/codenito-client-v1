// import React from 'react';
import user from "../assets/review/user.png";

const testimonials = [
  {
    id: 1,
    name: "Uzalah",
    role: "Web Developer",
    image: user,
    content:
      "As a Web Developer, I was impressed with Codenito's comprehensive web development services. They excel at crafting interactive user interfaces and building robust backend systems. The team's dedication to bringing digital visions to life is truly commendable. I highly recommend their expertise!",
    ratings: 4,
  },
  {
    id: 2,
    name: "Kholid",
    role: "Graphic Designer",
    image: user,
    content:
      "Codenito's UI/UX design services are top-notch! As a Graphic Designer, I appreciate their commitment to crafting visually stunning and user-friendly interfaces. They truly understand the importance of creating engaging experiences that elevate your digital presence. Working with them has been a pleasure.",
    ratings: 5,
  },
  {
    id: 3,
    name: "Bli Vino",
    role: "Marketing Specialist",
    image: user,
    content:
      "Being a Marketing Specialist, I value a flawless online presence. Codenito's web maintenance services ensure just that. They handle updates, provide excellent support, and perform routine checks to keep websites running smoothly. A reliable partner for maintaining a strong digital presence.",
    ratings: 3,
  },
];

const Review = () => {
  return (
    <div
      id="review"
      className="bg-gray-50 min-h-screen flex items-center justify-center  mx-auto "
    >
      <div className=" text-center md:max-w-xl lg:max-w-7xl px-[10px] md:px-0">
        <h3 className="mb-6 md:text-5xl text-3xl font-bold text-black">
          User Experience Journey
        </h3>
        <p className="md:text-xl md:pt-4 pt-2 mb-6 pb-2 md:mb-12 md:pb-0">
          Why Our Customers Are Extremely Satisfied with Their Experience
        </p>

        <div className="grid gap-10 pt-10 text-center md:grid-cols-3 lg:gap-12 px-[10px] md:px-0">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-32 rounded-full shadow-lg dark:shadow-black/30"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">{testimonial.name}</h5>
              <h6 className="mb-4 font-semibold text-primary dark:text-primary-500">
                {testimonial.role}
              </h6>
              <p className="mb-4">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
