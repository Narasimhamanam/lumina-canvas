import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact-form" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <a href="#" className="flex items-center gap-2.5" data-cursor="hover">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow font-display text-xs text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
              AV
            </span>
            <span className="hidden font-display text-xs uppercase tracking-[0.3em] text-foreground sm:inline">
              Aiden<span className="text-primary">.</span>Vance
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact-form"
            data-cursor="hover"
            className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground transition-all hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
