import React from "react";
import InternalLayout from "../InternalLayout";

const Dashboard: React.FC = () => {
  return (
    <InternalLayout>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>

      <section className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="pb-2 font-semibold">Profile</h2>
        <div className="text-justify flex flex-col gap-2">
          <p>
            Codenito is a technology company that provides comprehensive
            solutions for digital transformation. We specialize in IT
            Consulting, Software Development (Software House), Outsourcing, and
            Digital Product Development.
          </p>
          <p>
            Codenito is committed to helping businesses across various
            industries tackle technological challenges by offering reliable and
            innovative services, ranging from technology consulting and software
            development to providing skilled IT professionals. Our team of
            experts brings a wide range of technological expertise to deliver
            solutions tailored to your business needs. At Codenito, we believe
            that technology is key to driving growth and innovation. Through our
            products and services, we are dedicated to helping your business
            achieve efficiency and competitiveness in the digital era.
          </p>
        </div>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="pb-2 font-semibold">Our Services</h2>
        <ul className="list-none list-inside space-y-2 pt-2">
          <li>
            <h3 className="font-semibold">IT Consulting</h3>
            <p>
              We provide expert advice to help you navigate the complexities of
              technology and achieve your business goals through strategic
              planning and execution.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Software Development</h3>
            <p>
              Our software house specializes in developing custom software
              solutions tailored to your specific needs, from web and mobile
              applications to enterprise software.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Outsourcing</h3>
            <p>
              We offer IT outsourcing services to provide you with skilled
              professionals who can manage and execute your technology needs
              efficiently.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Codenito Product</h3>
            <p>
              We assist in the development of digital products, including
              ideation, design, development, and deployment, ensuring they meet
              the highest standards of quality.
            </p>
          </li>
        </ul>
      </section>
    </InternalLayout>
  );
};

export default Dashboard;
