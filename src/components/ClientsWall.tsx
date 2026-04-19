const CLIENTS = [
  "RVR & JC College of Engineering",
  "Ganesh Youth Assoc.",
  "Stories by Vihaa",
  "Santosh Infra",
  "Ravi Productions",
];

const ClientsWall = () => {
  const list = [...CLIENTS, ...CLIENTS];
  return (
    <section className="relative py-16">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Trusted by</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee flex w-max items-center gap-12 px-6">
          {list.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 whitespace-nowrap font-display text-lg text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(var(--primary))]" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsWall;
