import { useState } from "react";
import CinematicLoader from "@/components/CinematicLoader";
import CursorTrail from "@/components/CursorTrail";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
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
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Index;
