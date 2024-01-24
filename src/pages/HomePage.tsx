import Hero from "../component/Hero";
import About from "../component/About";
// import Portfolio from "../component/Portfolio";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import Review from "../component/Review";
// import Test from "../component/Test";

function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      {/* <Portfolio /> */}
      <Review />
      <Contact />
      <Footer />
      {/* <Test /> */}
    </div>
  );
}

export default HomePage;
