import { useEffect, useRef, useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";

type Category = "All" | "Commercials" | "Music Videos" | "Film" | "Brand";

interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, "All">;
  year: string;
  poster: string;
  preview: string; // hover autoplay (mp4)
  embed: string; // modal full player
}

// Curated open-source / royalty-free placeholders (Coverr / Mixkit-style CDN sample)
const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const SAMPLE_VIDEO_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const SAMPLE_VIDEO_3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const projects: Project[] = [
  {
    id: "p1",
    title: "Velocity — Nike Air",
    client: "Nike",
    category: "Commercials",
    year: "2025",
    poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    preview: SAMPLE_VIDEO,
    embed: SAMPLE_VIDEO,
  },
  {
    id: "p2",
    title: "Midnight Bloom",
    client: "Aurora",
    category: "Music Videos",
    year: "2024",
    poster: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80",
    preview: SAMPLE_VIDEO_2,
    embed: SAMPLE_VIDEO_2,
  },
  {
    id: "p3",
    title: "Echoes — Short Film",
    client: "A24 Spec",
    category: "Film",
    year: "2024",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    preview: SAMPLE_VIDEO_3,
    embed: SAMPLE_VIDEO_3,
  },
  {
    id: "p4",
    title: "Apex — BMW M",
    client: "BMW",
    category: "Commercials",
    year: "2025",
    poster: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    preview: SAMPLE_VIDEO,
    embed: SAMPLE_VIDEO,
  },
  {
    id: "p5",
    title: "Crimson Tide",
    client: "Lyric Records",
    category: "Music Videos",
    year: "2024",
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    preview: SAMPLE_VIDEO_2,
    embed: SAMPLE_VIDEO_2,
  },
  {
    id: "p6",
    title: "Atelier",
    client: "Maison Voss",
    category: "Brand",
    year: "2023",
    poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    preview: SAMPLE_VIDEO_3,
    embed: SAMPLE_VIDEO_3,
  },
];

const categories: Category[] = ["All", "Commercials", "Music Videos", "Film", "Brand"];

const Work = () => {
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 80);
            });
          }
        });
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Lock scroll when modal open + ESC to close
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="work" ref={sectionRef} className="relative py-32">
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(28px); transition: all 0.8s var(--ease-out-expo); }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="container mx-auto">
        <div className="mb-12 flex items-center gap-4" data-reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 02</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected Work</span>
        </div>

        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            <span className="text-foreground">Frames that</span>{" "}
            <span className="text-gradient-primary">move people.</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-cursor="hover"
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
                  active === c
                    ? "border-primary bg-primary/15 text-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-surface-deep/95 p-4 backdrop-blur-xl animate-fade-in"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            data-cursor="hover"
            aria-label="Close"
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-primary hover:bg-primary/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl glass-strong animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full bg-black">
              <video
                src={open.embed}
                controls
                autoPlay
                className="h-full w-full"
                poster={open.poster}
              />
            </div>
            <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  {open.client} · {open.year}
                </div>
                <div className="mt-1 font-display text-2xl text-foreground">{open.title}</div>
              </div>
              <a
                href="#contact"
                data-cursor="hover"
                onClick={() => setOpen(null)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground hover:bg-primary/20"
              >
                Discuss a project <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article
      data-reveal
      data-cursor="hover"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-surface-raised transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.5)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={project.poster}
          alt={`${project.title} — ${project.client}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <video
          ref={videoRef}
          src={project.preview}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/30 to-transparent" />

        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-surface-deep/60 backdrop-blur-md transition-all group-hover:bg-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)]">
          <Play className="h-4 w-4 text-foreground" fill="currentColor" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            {project.category} · {project.year}
          </div>
          <h3 className="mt-1.5 font-display text-xl leading-tight text-foreground">{project.title}</h3>
          <div className="mt-1 text-xs text-muted-foreground">{project.client}</div>
        </div>
      </div>
    </article>
  );
};

export default Work;
