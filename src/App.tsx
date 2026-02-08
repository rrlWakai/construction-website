import Navbar from "./components/Navbar";
import BackgroundProvider from "./components/BackgroundProvider";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import FeaturedProjects from "./sections/FeaturedProjects";
import Testimonials from "./sections/Testimonials";
import FinalCTA from "./sections/FinalCTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <main className="relative">
      <BackgroundProvider>
        <Navbar />
        <Hero />
      </BackgroundProvider>
      <About />
      <Services />
      <FeaturedProjects />
      <Testimonials />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
