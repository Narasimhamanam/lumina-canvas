import { useEffect, useRef, useState } from "react";
import { Film } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const { data } = useSiteContent("skills");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setAnimate(true);
            e.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 70);
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden">
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: all 0.8s var(--ease-out-expo); }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }
      `}</style>
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4" data-reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 03</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Toolkit</span>
        </div>
        <h2 data-reveal className="mb-16 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
          <span className="text-foreground">Tools </span>{" "}
          <span className="text-gradient-primary italic">used.</span>
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {data.items.map((s, i) => (
            <div key={s.name + i} data-reveal className="group">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Film className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm uppercase tracking-[0.15em] text-foreground">{s.name}</span>
                </div>
                <span className="font-mono text-xs text-primary">{s.level}%</span>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary via-primary-glow to-secondary shadow-[0_0_15px_hsl(var(--primary)/0.6)] transition-all duration-[1400ms] ease-cinematic"
                  style={{ width: animate ? `${s.level}%` : "0%", transitionDelay: `${i * 100}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
