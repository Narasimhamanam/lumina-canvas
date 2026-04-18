import { useState } from "react";
import CinematicLoader from "@/components/CinematicLoader";
import CursorTrail from "@/components/CursorTrail";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ScarcityBar from "@/components/ScarcityBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Stats from "@/components/sections/Stats";
import ClientsWall from "@/components/ClientsWall";
import LiveInquiryFeed from "@/components/LiveInquiryFeed";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import QuoteCalculator from "@/components/QuoteCalculator";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}
      <CursorTrail />
      <SmoothScroll>
        <main className="relative min-h-screen bg-surface-deep text-foreground">
          <ScarcityBar />
          <Navbar onOpenQuote={() => setQuoteOpen(true)} />
          <Hero onOpenQuote={() => setQuoteOpen(true)} />
          <ClientsWall />
          <About />
          <Work />
          <Skills />
          <Stats />
          <LiveInquiryFeed />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
      <FloatingCTA onOpenQuote={() => setQuoteOpen(true)} />
      <QuoteCalculator open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};

export default Index;
