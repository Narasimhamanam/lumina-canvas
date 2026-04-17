import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 2, suffix: " Yrs", label: "Industry Experience" },
  { value: 90, suffix: "%", label: "Client Satisfaction" },
];

const useCountUp = (end: number, run: boolean, duration = 1800) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, run, duration]);
  return v;
};

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setRun(true),
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const v = useCountUp(value, run);
  return (
    <div ref={ref} className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none text-gradient-primary">
      {v}
      <span className="text-foreground">{suffix}</span>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="relative py-24 border-y border-white/5">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="container relative mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
