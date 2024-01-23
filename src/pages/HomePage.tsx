import Hero from "../component/Hero";
import About from "../component/About";
import Portfolio from "../component/Portfolio";
import Contact from "../component/Contact";
import Footer from "../component/Footer";

function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Portfolio />
      {/* <Review /> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
