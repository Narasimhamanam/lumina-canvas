import { useEffect, useRef } from "react";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

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

  const words = "I sculpt raw footage into emotional, cinematic narratives — the kind that linger long after the screen fades.".split(" ");

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

        <h2
          data-reveal
          className="mb-12 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]"
        >
          <span className="text-gradient">Crafting</span>{" "}
          <span className="text-foreground">visuals that</span>{" "}
          <span className="text-primary">feel.</span>
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7" data-reveal>
            <p className="mb-6 text-xl leading-relaxed text-foreground/90">
              {words.map((w, i) => (
                <span key={i} className="word lit" style={{ transitionDelay: `${i * 40}ms` }}>
                  {w}{" "}
                </span>
              ))}
            </p>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
            Over the last <span className="text-foreground">2+ years</span>, I&apos;ve worked as a mobile video editor, creating engaging content for many clients using tools like Alight Motion, CapCut, Node Video, VN, InShot, KineMaster, and Premiere Pro. My passion is turning raw clips into smooth, eye-catching edits with creativity, rhythm, and impact.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I work end-to-end — from offline edit and sound design to grade and finishing — so the
              vision arrives intact.
            </p>
          </div>

          <div className="md:col-span-5 space-y-4" data-reveal>
            {[
              { label: "Based in", value: "Guntur - India · Remote" },
              { label: "Specialty", value: "Commercials · Birthday · Promotions · Music Videos ·  Short Films" },
              { label: "Toolkit", value: "Capcut · Alight motion · Node Video · VN · Premiere Pro" },
              { label: "Languages", value: "English · Telugu · Hindi" },
            ].map((row) => (
              <div
                key={row.label}
                className="glass rounded-xl p-5 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  {row.label}
                </div>
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
