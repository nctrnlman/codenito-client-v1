import Hero from "../components/Hero";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Review from "../components/Review";

function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Portfolio />
      <Review />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
