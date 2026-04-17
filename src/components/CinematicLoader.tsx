import { useEffect, useState } from "react";

const CinematicLoader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 14 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setExiting(true), 400);
        setTimeout(onDone, 1200);
      } else {
        setProgress(p);
      }
    }, 140);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-deep transition-all duration-700 ease-cinematic ${
        exiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-primary/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 8px hsl(var(--primary))",
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Portal tunnel */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-[420px] w-[420px] rounded-full border border-primary/20 animate-portal-spin" />
        <div className="absolute h-[320px] w-[320px] rounded-full border border-secondary/30 animate-portal-spin" style={{ animationDirection: "reverse", animationDuration: "6s" }} />
        <div className="absolute h-[220px] w-[220px] rounded-full border border-primary/40 animate-portal-spin" style={{ animationDuration: "4s" }} />
        <div className="absolute h-[140px] w-[140px] rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-2xl animate-portal-pulse" />

        <div className="relative z-10 text-center">
          <div className="font-display text-3xl tracking-[0.4em] text-gradient-primary">AV</div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Loading Cinematic Experience
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-16 left-1/2 w-72 -translate-x-1/2">
        <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Initializing</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary-glow to-secondary transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px hsl(var(--primary))" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CinematicLoader;
