import { ArrowUpRight, Instagram, Youtube, Linkedin, Mail, MessageCircle } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://instagram.com/narasimhachowdary_", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@Flickfusion_beats", label: "YouTube" },
  { 
  icon: MessageCircle, 
  href: "https://api.whatsapp.com/send?phone=917386464170&", 
  label: "WhatsApp" 
},
{ icon: Mail, href: "mailto:narasimhamanam6014@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer id="contact" className="relative mt-20 overflow-hidden border-t border-white/5 pt-24 pb-10">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">
            It&apos;s your time
          </div>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight">
            <span className="text-foreground">Want to</span>{" "}
            <span className="text-gradient-primary italic">collaborate?</span>
          </h2>
          <a
            href="mailto:narasimhamanam6014@gmail.com"
            data-cursor="hover"
            className="mt-10 inline-flex items-center gap-3 font-display text-xl text-foreground transition-colors hover:text-primary sm:text-2xl"
          >
            narasimhamanam6014@gmail.com
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 border-t border-white/5 pt-8 md:grid-cols-3">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Narasimha Manam Edits
          </div>

          <div className="flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                data-cursor="hover"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary/60 hover:text-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-cursor="hover"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
            >
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-primary/60 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
