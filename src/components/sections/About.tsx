import { useEffect, useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useSiteContent("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 90);
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = data.headline_quote.split(" ");

  const rows = [
    { label: "Based in", value: data.based_in },
    { label: "Specialty", value: data.specialty },
    { label: "Toolkit", value: data.toolkit },
    { label: "Languages", value: data.languages },
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: all 0.8s var(--ease-out-expo); }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }
        .word { opacity: 0.15; transition: opacity 0.6s var(--ease-out-expo); }
        .word.lit { opacity: 1; }
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16 flex items-center gap-4" data-reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 01</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">About</span>
        </div>
        <h2 data-reveal className="mb-12 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
          <span className="text-gradient">Crafting</span>{" "}
          <span className="text-foreground">visuals that</span>{" "}
          <span className="text-primary">feel.</span>
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7" data-reveal>
            <p className="mb-6 text-xl leading-relaxed text-foreground/90">
              {words.map((w, i) => (
                <span key={i} className="word lit" style={{ transitionDelay: `${i * 40}ms` }}>{w}{" "}</span>
              ))}
            </p>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">{data.paragraph_1}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{data.paragraph_2}</p>
          </div>
          <div className="md:col-span-5 space-y-4" data-reveal>
            {rows.map((row) => (
              <div key={row.label} className="glass rounded-xl p-5 transition-all duration-500 hover:border-primary/40">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{row.label}</div>
                <div className="mt-1 text-sm text-foreground">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
