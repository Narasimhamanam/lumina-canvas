import { useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import A2 from "@/assets/A2.jpg";
import A1 from "@/assets/A1.jpg";
import A3 from "@/assets/A3.jpg";

// cspell: disable
const items = [
  {
    quote:
      "Anna, thank you so much for the edit. Video came out super clean and exactly how I wanted.",
    name: "Akhila Bevara",
    role: "Client",
    avatar: A1
  },
  {
    quote:
      "Bro, really happy with the final output. Effects and transitions were too good. Thanks a lot!",
    name: "Ajith Kumar",
    role: "Client",
    avatar: A2
  },
  {
    quote:
      "Thanks brother, video edit was awesome. Everyone liked it and quality was top class.",
    name: "Pavan Kumar",
    role: "Client",
    avatar: A3
  },
];
// cspell: enable

const Testimonials = () => {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, []);

  const go = (d: number) => setI((p) => (p + d + items.length) % items.length);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="container relative mx-auto max-w-4xl text-center">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 04 · Kind Words</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        <Quote className="mx-auto mb-8 h-12 w-12 text-primary/40" />

        <div className="relative min-h-[260px]">
          {items.map((t, idx) => (
            <div
              key={t.name}
              className={`absolute inset-0 transition-all duration-700 ease-cinematic ${
                idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="mb-8 font-display text-[clamp(1.25rem,2.5vw,2rem)] leading-snug text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mx-auto mb-3 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-12 w-12 rounded-full border-2 border-primary/40 object-cover"
                  loading="lazy"
                />
                <div className="text-left">
                  <div className="font-display text-sm text-foreground">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            data-cursor="hover"
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            data-cursor="hover"
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
