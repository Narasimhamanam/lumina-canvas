import { Flame } from "lucide-react";

const ScarcityBar = () => (
  <div className="relative z-30 w-full border-b border-white/5 bg-gradient-to-r from-signal/15 via-secondary/10 to-primary/10 backdrop-blur-md">
    <div className="container mx-auto flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-[0.25em] sm:text-xs">
      <Flame className="h-3.5 w-3.5 text-signal animate-signal-blink" />
      <span className="font-mono text-foreground/90">Limited project slots every week</span>
      <span className="hidden font-mono text-muted-foreground sm:inline">· Booking opens 24/7</span>
    </div>
  </div>
);

export default ScarcityBar;
