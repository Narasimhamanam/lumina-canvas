import { Suspense, lazy } from "react";
import MagneticButton from "@/components/MagneticButton";
import profile from "@/assets/profile.png";
import { Play, ArrowDown } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroFrame = lazy(() => import("@/components/three/HeroFrame"));

const Hero = ({ onOpenQuote }: { onOpenQuote?: () => void }) => {
  const { data } = useSiteContent("hero");
  const { data: contact } = useSiteContent("contact");
  const wa = contact.whatsapp || "917386464170";

  return (
    <section className="relative min-h-screen w-full overflow-hidden gradient-hero noise pt-32 pb-20">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]" />

      <div className="container relative mx-auto grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">{data.badge}</span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
            <span className="block text-gradient-primary">{data.title_top}</span>
            <span className="block text-foreground/90">{data.title_bottom}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{data.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton href="#work" variant="primary"><Play className="h-4 w-4" /> View Work</MagneticButton>
            {onOpenQuote ? (
              <button
                onClick={onOpenQuote}
                className="magnetic-btn rounded-full border border-secondary/40 bg-secondary/10 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-all hover:border-secondary hover:bg-secondary/20"
                data-cursor="hover"
              >
                Book Project
              </button>
            ) : (
              <MagneticButton href="#contact-form" variant="ghost">Book Project</MagneticButton>
            )}
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent("Hi Narasimha, I want to discuss a project")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="magnetic-btn rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(16,185,129,0.45)]"
            >
              WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-8 pt-8">
            {[
              { k: data.stat1_value, v: data.stat1_label },
              { k: data.stat2_value, v: data.stat2_label },
              { k: data.stat3_value, v: data.stat3_label },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-2xl text-foreground">{s.k}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md animate-scale-in">
            <div className="absolute inset-0 -m-8">
              <Suspense fallback={null}><HeroFrame /></Suspense>
            </div>
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] glass-strong animate-float-slow">
              <img src={profile} alt="Narasimha Manam, cinematic video editor portrait" width={1024} height={1280} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-transparent to-transparent" />
              <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-primary" />
              <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-primary" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-primary" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="text-foreground/70">REC ●</span>
                <span className="text-primary">24.000 FPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
