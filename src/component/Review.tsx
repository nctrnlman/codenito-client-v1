// import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Maria Smantha",
    role: "Web Developer",
    image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
    content:
      "As a Web Developer, I was impressed with Codenito's comprehensive web development services. They excel at crafting interactive user interfaces and building robust backend systems. The team's dedication to bringing digital visions to life is truly commendable. I highly recommend their expertise!",
    ratings: 4,
  },
  {
    id: 2,
    name: "Lisa Cudrow",
    role: "Graphic Designer",
    image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg",
    content:
      "Codenito's UI/UX design services are top-notch! As a Graphic Designer, I appreciate their commitment to crafting visually stunning and user-friendly interfaces. They truly understand the importance of creating engaging experiences that elevate your digital presence. Working with them has been a pleasure.",
    ratings: 5,
  },
  {
    id: 3,
    name: "John Smith",
    role: "Marketing Specialist",
    image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg",
    content:
      "Being a Marketing Specialist, I value a flawless online presence. Codenito's web maintenance services ensure just that. They handle updates, provide excellent support, and perform routine checks to keep websites running smoothly. A reliable partner for maintaining a strong digital presence.",
    ratings: 3,
  },
];

const Review = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center  mx-auto">
      <div className=" text-center md:max-w-xl lg:max-w-7xl">
        <h3 className="mb-6 text-5xl font-bold text-black">
          User Experience Journey
        </h3>
        <p className="text-lg mb-6 pb-2 md:mb-12 md:pb-0">
          Why Our Customers Are Extremely Satisfied with Their Experience
        </p>

        <div className="grid gap-10 pt-10 text-center md:grid-cols-3 lg:gap-12">
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
