import { useState, FormEvent } from "react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter valid email"),
  budget: z.string().trim().min(1, "Enter budget"),
  message: z.string().trim().min(5, "Tell what type of edit you want").max(1200),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const WHATSAPP_NUMBER = "917386464170";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const data = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      budget: String(fd.get("budget") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Errors;
        errs[key] = issue.message;
      });
      setErrors(errs);
      toast({
        title: "Check the form",
        description: "Please fill all fields correctly.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});

      const whatsappMessage =
        `Hii Narasimha, I'm ${data.name} and my mail is ${data.email}. ` +
        `I want a ${data.message} and my estimated budget is ₹${data.budget}. ` +
        `If you like, we can have a chat on this.`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
        whatsappMessage
      )}`;

      window.open(whatsappURL, "_blank");

      setDone(true);
      toast({
        title: "Opening WhatsApp",
        description: "Your message is ready to send.",
      });

      form.reset();
      setTimeout(() => setDone(false), 4000);
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not open WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="relative py-32 overflow-hidden">
      <div className="container relative mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 05</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Start a Project
          </span>
        </div>

        <h2 className="mb-10 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold">
          Need an <span className="text-gradient-primary italic">Edit?</span>
        </h2>

        <form
          onSubmit={onSubmit}
          className="glass-strong rounded-2xl p-6 sm:p-10 space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your full name" error={errors.name} />
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
            placeholder="500 / 1000 / 2500"
            error={errors.budget}
          />

          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              What Type of Edit You Want
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Birthday edit, reel, wedding highlight, cinematic promo..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            />
            {errors.message && (
              <p className="mt-2 text-xs text-destructive">{errors.message}</p>
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
                Opening
              </>
            ) : done ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Ready
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
    {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
  </div>
);

export default Contact;
