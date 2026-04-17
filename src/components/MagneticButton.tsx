import { useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  href?: string;
  strength?: number;
}

const MagneticButton = ({ children, className, onClick, variant = "primary", href, strength = 0.35 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.8)]",
    ghost:
      "bg-white/5 text-foreground border border-white/10 backdrop-blur-md hover:bg-white/10",
    outline:
      "bg-transparent border border-primary/60 text-foreground hover:bg-primary/10 hover:border-primary",
  };

  const Inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "magnetic-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-cinematic",
        variants[variant],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" data-cursor="hover">
        {Inner}
      </a>
    );
  }
  return <button type="button" className="inline-block" data-cursor="hover" onClick={onClick}>{Inner}</button>;
};

export default MagneticButton;
