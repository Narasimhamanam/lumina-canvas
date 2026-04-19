import { MessageCircle, Calculator } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP = "https://wa.me/917386464170?text=Hi%20Narasimha%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.";

const FloatingCTA = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating stack — bottom right */}
      <div
        className={`fixed bottom-6 right-6 z-[80] hidden flex-col items-end gap-3 transition-all duration-500 md:flex ${
          show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={onOpenQuote}
          data-cursor="hover"
          className="group flex items-center gap-2 rounded-full glass-strong px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-all hover:scale-105 hover:border-primary/60 glow-primary"
          aria-label="AI Instant Quote"
        >
          <Calculator className="h-4 w-4 text-primary" />
          <span>Instant Quote</span>
        </button>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          aria-label="WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-[0_0_28px_rgba(16,185,129,0.55)] transition-transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </a>
      </div>

      {/* Mobile sticky CTA bar */}
      <div
        className={`fixed inset-x-3 bottom-3 z-[80] flex items-center gap-2 rounded-2xl glass-strong p-2 transition-all duration-500 md:hidden ${
          show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={onOpenQuote}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          <Calculator className="h-4 w-4" /> Get Quote
        </button>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-white" />
        </a>
      </div>
    </>
  );
};

export default FloatingCTA;
