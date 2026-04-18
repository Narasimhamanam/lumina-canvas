import { useState, FormEvent } from "react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter valid email"),
  budget: z.string().optional(),
  message: z.string().trim().min(10, "Tell more details").max(1200),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const fd = new FormData(form);

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

      toast({
        title: "Check the form",
        description: "Some fields need attention.",
      });

      return;
    }

    try {
      setErrors({});
      setSubmitting(true);

      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": "contact",
          name: data.name,
          email: data.email,
          budget: data.budget,
          message: data.message,
        }).toString(),
      });

      setSubmitting(false);
      setDone(true);

      toast({
        title: "Message Sent ✦",
        description: "Thanks — I will reply soon.",
      });

      form.reset();

      setTimeout(() => setDone(false), 4000);
    } catch (error) {
      setSubmitting(false);

      toast({
        title: "Failed",
        description: "Could not send message.",
      });
    }
  };

  return (
    <section id="contact-form" className="relative py-32 overflow-hidden">
      <div className="container relative mx-auto max-w-3xl">

        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            / 05
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Start a Project
          </span>
        </div>

        <h2 className="mb-10 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold">
          Need an <span className="text-gradient-primary italic">Edit?</span>
        </h2>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="glass-strong rounded-2xl p-6 sm:p-10 space-y-6"
          noValidate
        >
          {/* Hidden fields required by Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Name"
              name="name"
              placeholder="Your full name"
              error={errors.name}
            />

            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@gmail.com"
              error={errors.email}
            />
          </div>

          <Field
            label="Budget"
            name="budget"
            placeholder="100rs / 500rs / 1000rs"
            error={errors.budget}
          />

          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              Project Brief
            </label>

            <textarea
              name="message"
              rows={5}
              placeholder="Tell me your edit type, style, song, duration..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            />

            {errors.message && (
              <p className="mt-2 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || done}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-8 py-3 text-sm uppercase"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending
              </>
            ) : done ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Sent
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4" />
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
    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
      {label}
    </label>

    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
    />

    {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
  </div>
);

export default Contact;