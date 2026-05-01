import { useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Testimonials = () => {
  const { data } = useSiteContent("testimonials");
  const items = data.items;
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
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
              key={(t.name ?? "") + idx}
              className={`absolute inset-0 transition-all duration-700 ease-cinematic ${
                idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="mb-8 font-display text-[clamp(1.25rem,2.5vw,2rem)] leading-snug text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mx-auto mb-3 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <div className="flex items-center justify-center gap-3">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full border-2 border-primary/40 object-cover" loading="lazy" />
                ) : (
                  <div className="h-12 w-12 rounded-full border-2 border-primary/40 bg-primary/10 grid place-items-center font-display text-sm">{t.name?.[0]}</div>
                )}
                <div className="text-left">
                  <div className="font-display text-sm text-foreground">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Go to ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-white/20"}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-primary">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
