import { useState } from "react";
import CinematicLoader from "@/components/CinematicLoader";
import CursorTrail from "@/components/CursorTrail";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}
      <CursorTrail />
      <SmoothScroll>
        <main className="relative min-h-screen bg-surface-deep text-foreground">
          <Navbar />
          <Hero />
          <About />
          <Work />
          <Skills />
          <Stats />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Index;
