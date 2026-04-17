import { useState, FormEvent } from "react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(180),
  budget: z.string().max(40).optional(),
  message: z.string().trim().min(10, "Tell me a little more").max(1200, "Keep it under 1200 chars"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      budget: String(fd.get("budget") || ""),
      message: String(fd.get("message") || ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as keyof Errors] = i.message;
      });
      setErrors(errs);
      toast({ title: "Please check the form", description: "A few fields need attention." });
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulated send — backend wiring lands in Phase 3
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast({
      title: "Message sent ✦",
      description: "Thanks — I'll reply within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section id="contact-form" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/3 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="container relative mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 05</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Start a Project</span>
        </div>

        <h2 className="mb-10 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05]">
          <span className="text-foreground">If you need a</span>{" "}
          <span className="text-gradient-primary italic">Project.</span>
        </h2>

        <form onSubmit={onSubmit} className="glass-strong rounded-2xl p-6 sm:p-10 space-y-6" noValidate>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your full name" error={errors.name} />
            <Field label="Email" name="email" type="email" placeholder="you@gmail.com" error={errors.email} />
          </div>

          <Field label="Budget (optional)" name="budget" placeholder=">100rs" error={errors.budget} />

          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              Project Brief
            </label>
            <textarea
              name="message"
              rows={5}
              maxLength={1200}
              placeholder="Tell me about the Edit type, theme, song, duration…"
              data-cursor="hover"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/60 focus:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
            />
            {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting || done}
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-glow px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all hover:shadow-[0_0_50px_hsl(var(--primary)/0.8)] disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending
              </>
            ) : done ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Sent
              </>
            ) : (
              <>
                Send Message <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) => (
  <div>
    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      data-cursor="hover"
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/60 focus:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
    />
    {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
  </div>
);

export default Contact;
