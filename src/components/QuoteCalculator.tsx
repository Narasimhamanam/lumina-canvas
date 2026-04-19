import { useEffect, useMemo, useState } from "react";
import { X, Sparkles, MessageCircle, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const TYPES = [
  { id: "birthday", label: "Birthday Edit", base: 500 },
  { id: "shorts", label: "Reels / Shorts", base: 350 },
  { id: "promo", label: "Promo / Event", base: 1000 },
  { id: "wedding", label: "Wedding Highlight", base: 2500 },
  { id: "commercial", label: "Brand Commercial", base: 3500 },
];

const EFFECTS = [
  { id: "clean", label: "Clean cuts", mult: 1 },
  { id: "standard", label: "Standard FX", mult: 1.4 },
  { id: "cinematic", label: "Cinematic", mult: 1.9 },
  { id: "vfx", label: "Heavy VFX", mult: 2.6 },
];

const TURNAROUND = [
  { id: 7, label: "7 days", mult: 1 },
  { id: 4, label: "4 days", mult: 1.25 },
  { id: 2, label: "2 days · rush", mult: 1.6 },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const QuoteCalculator = ({ open, onClose }: Props) => {
  const [type, setType] = useState(TYPES[0].id);
  const [duration, setDuration] = useState(2);
  const [effects, setEffects] = useState(EFFECTS[1].id);
  const [days, setDays] = useState<number>(TURNAROUND[0].id);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const price = useMemo(() => {
    const t = TYPES.find((x) => x.id === type)!;
    const e = EFFECTS.find((x) => x.id === effects)!;
    const d = TURNAROUND.find((x) => x.id === days)!;
    const lengthFactor = 0.6 + duration * 0.45; // 1 min ~ 1.05x, 5 min ~ 2.85x
    return Math.round((t.base * lengthFactor * e.mult * d.mult) / 50) * 50;
  }, [type, duration, effects, days]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const submit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("quote_requests").insert({
      project_type: type,
      duration_minutes: duration,
      turnaround_days: days,
      effects_level: effects,
      estimated_price_inr: price,
      display_name: name.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not save", description: error.message });
      return;
    }
    setDone(true);
    toast({ title: "Quote locked ✦", description: `Estimate: ₹${price.toLocaleString("en-IN")}` });
    setTimeout(() => {
      const wa = `https://api.whatsapp.com/send?phone=917386464170&text=${encodeURIComponent(
        `Hi Narasimha! I got an instant quote of ₹${price.toLocaleString("en-IN")} for a ${
          TYPES.find((t) => t.id === type)?.label
        } (${duration} min, ${effects} fx, ${days}d turnaround). Let's discuss.`
      )}`;
      window.open(wa, "_blank");
    }, 600);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-surface-deep/85 p-4 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-strong animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-primary hover:bg-primary/20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-6 sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary glow-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">AI Quote Engine</div>
              <h3 className="font-display text-xl text-foreground">Instant Estimate</h3>
            </div>
          </div>

          <div className="space-y-5">
            <Field label="Project type">
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <Pill key={t.id} active={type === t.id} onClick={() => setType(t.id)}>
                    {t.label}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label={`Duration · ${duration} min`}>
              <input
                type="range"
                min={1}
                max={10}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-[hsl(var(--primary))]"
              />
            </Field>

            <Field label="Effects level">
              <div className="flex flex-wrap gap-2">
                {EFFECTS.map((e) => (
                  <Pill key={e.id} active={effects === e.id} onClick={() => setEffects(e.id)}>
                    {e.label}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Turnaround">
              <div className="flex flex-wrap gap-2">
                {TURNAROUND.map((d) => (
                  <Pill key={d.id} active={days === d.id} onClick={() => setDays(d.id)}>
                    {d.label}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Your name (optional)">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Will appear on the live feed"
                maxLength={40}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary/60"
              />
            </Field>
          </div>

          <div className="mt-7 flex flex-col items-stretch gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Estimated price</div>
              <div className="mt-1 font-display text-3xl text-gradient-primary">₹{price.toLocaleString("en-IN")}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Final quote may vary by complexity
              </div>
            </div>
            <button
              onClick={submit}
              disabled={submitting || done}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_24px_hsl(var(--primary)/0.45)] transition-all hover:scale-[1.02] disabled:opacity-60"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving</>
              ) : done ? (
                <><Check className="h-4 w-4" /> Sent</>
              ) : (
                <><MessageCircle className="h-4 w-4" /> Lock & WhatsApp</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{label}</div>
    {children}
  </div>
);

const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all ${
      active
        ? "border-primary bg-primary/15 text-foreground shadow-[0_0_18px_hsl(var(--primary)/0.4)]"
        : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/50 hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

export default QuoteCalculator;
