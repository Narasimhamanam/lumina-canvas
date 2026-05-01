import { useEffect, useMemo, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useWorkVideos, type WorkVideo } from "@/hooks/useWorkVideos";

// Legacy hardcoded videos kept as fallback while DB is empty.
import b1 from "@/assets/portfolio/b1.mp4";
import b2 from "@/assets/portfolio/b2.mp4";
import b3 from "@/assets/portfolio/b3.mp4";
import b4 from "@/assets/portfolio/b4.mp4";
import b5 from "@/assets/portfolio/b5.mp4";
import t1 from "@/assets/thumbnails/b1.png";
import t2 from "@/assets/thumbnails/b2.png";
import t3 from "@/assets/thumbnails/b3.png";
import t4 from "@/assets/thumbnails/b4.png";
import t5 from "@/assets/thumbnails/b5.png";
import c1t from "@/assets/thumbnails/c1.png";
import c2t from "@/assets/thumbnails/c2.png";
import c3t from "@/assets/thumbnails/c3.png";
import c4t from "@/assets/thumbnails/c4.png";
import c5t from "@/assets/thumbnails/c5.png";
import c1 from "@/assets/portfolio/c1.mp4";
import c2 from "@/assets/portfolio/c2.mp4";
import c3 from "@/assets/portfolio/c3.mp4";
import c4 from "@/assets/portfolio/c4.mp4";
import c5 from "@/assets/portfolio/c5.mp4";
import by1 from "@/assets/portfolio/boys1.mp4";
import by2 from "@/assets/portfolio/boys2.mp4";
import by3 from "@/assets/portfolio/boys3.mp4";
import by4 from "@/assets/portfolio/boys4.mp4";
import byt1 from "@/assets/thumbnails/bt1.png";
import byt2 from "@/assets/thumbnails/bt2.png";
import byt3 from "@/assets/thumbnails/bt3.png";
import byt4 from "@/assets/thumbnails/bt4.png";
import s1 from "@/assets/portfolio/s1.mp4";
import s2 from "@/assets/portfolio/s2.mp4";
import s3 from "@/assets/portfolio/s3.mp4";
import s4 from "@/assets/portfolio/s4.mp4";
import s5 from "@/assets/portfolio/s5.mp4";
import st1 from "@/assets/thumbnails/s1.png";
import st2 from "@/assets/thumbnails/s2.png";
import st3 from "@/assets/thumbnails/s3.png";
import st4 from "@/assets/thumbnails/s4.png";
import st5 from "@/assets/thumbnails/s5.png";
import prom1 from "@/assets/portfolio/pr1.mp4";
import prom2 from "@/assets/portfolio/pr2.mp4";
import prom3 from "@/assets/portfolio/pr3.mp4";
import prom4 from "@/assets/portfolio/pr4.mp4";
import prom5 from "@/assets/portfolio/pr5.mp4";
import prom6 from "@/assets/portfolio/pr6.mp4";
import prom7 from "@/assets/portfolio/pr7.mp4";
import prom8 from "@/assets/portfolio/pr8.mp4";
import pt1 from "@/assets/thumbnails/p1.png";
import pt2 from "@/assets/thumbnails/p2.png";
import pt3 from "@/assets/thumbnails/p3.png";
import pt4 from "@/assets/thumbnails/p4.png";
import pt5 from "@/assets/thumbnails/p5.png";
import pt6 from "@/assets/thumbnails/p6.png";
import pt7 from "@/assets/thumbnails/p7.png";
import pt8 from "@/assets/thumbnails/p8.png";

type Category = "All" | "Birthdays" | "Kids" | "Promotions" | "Shorts";
const categories: Category[] = ["All", "Birthdays", "Kids", "Promotions", "Shorts"];

const FALLBACK: WorkVideo[] = [
  { id: "p1", title: "Akhila Bevara Birthday Edit Mashup", client: "Akhila", category: "Birthdays", year: "2026", poster_url: t1, video_url: b1, sort_order: 0, is_active: true },
  { id: "p2", title: "Bhavya sri Birthday Edit", client: "Birthday", category: "Birthdays", year: "2026", poster_url: t2, video_url: b2, sort_order: 0, is_active: true },
  { id: "p3", title: "Dhanvika Diya Birthday Edit", client: "Diya", category: "Birthdays", year: "2024", poster_url: t3, video_url: b3, sort_order: 0, is_active: true },
  { id: "p4", title: "Nandu Birthday Edit", client: "Nandu", category: "Birthdays", year: "2024", poster_url: t5, video_url: b5, sort_order: 0, is_active: true },
  { id: "p5", title: "Sri Shainy Birthday Edit", client: "Sri Shainy", category: "Birthdays", year: "2024", poster_url: t4, video_url: b4, sort_order: 0, is_active: true },
  { id: "p6", title: "Dhanvika Diya Edit", client: "Dhanvika Diya", category: "Kids", year: "2025", poster_url: c1t, video_url: c1, sort_order: 0, is_active: true },
  { id: "p7", title: "Stories by Vihaa Edit", client: "Vihaa", category: "Kids", year: "2025", poster_url: c2t, video_url: c2, sort_order: 0, is_active: true },
  { id: "p8", title: "Diya Edit 2025", client: "Dhanvika Diya", category: "Kids", year: "2025", poster_url: c3t, video_url: c3, sort_order: 0, is_active: true },
  { id: "p9", title: "Kids Trending Edit", client: "Dhanvika Diya", category: "Kids", year: "2025", poster_url: c4t, video_url: c4, sort_order: 0, is_active: true },
  { id: "p10", title: "Kids Special Edit", client: "Dhanvika Diya", category: "Kids", year: "2025", poster_url: c5t, video_url: c5, sort_order: 0, is_active: true },
  { id: "p11", title: "Boys Trending Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: byt1, video_url: by1, sort_order: 0, is_active: true },
  { id: "p12", title: "Boys Special Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: byt2, video_url: by2, sort_order: 0, is_active: true },
  { id: "p13", title: "Boys Editor Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: byt3, video_url: by3, sort_order: 0, is_active: true },
  { id: "p14", title: "Boys Style Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: byt4, video_url: by4, sort_order: 0, is_active: true },
  { id: "p15", title: "Shorts Trending Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: st1, video_url: s1, sort_order: 0, is_active: true },
  { id: "p16", title: "Shorts Special Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: st2, video_url: s2, sort_order: 0, is_active: true },
  { id: "p17", title: "Shorts Editor Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: st3, video_url: s3, sort_order: 0, is_active: true },
  { id: "p18", title: "Shorts Style Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: st4, video_url: s4, sort_order: 0, is_active: true },
  { id: "p19", title: "Shorts Highlight Edit", client: "Narasimha", category: "Shorts", year: "2025", poster_url: st5, video_url: s5, sort_order: 0, is_active: true },
  { id: "p20", title: "Home unlocking Edit", client: "Bhavani", category: "Promotions", year: "2025", poster_url: pt1, video_url: prom1, sort_order: 0, is_active: true },
  { id: "p21", title: "Tech Fest Edit", client: "RVR & JC College of Engineering", category: "Promotions", year: "2025", poster_url: pt2, video_url: prom2, sort_order: 0, is_active: true },
  { id: "p22", title: "Ganesh chavithi Edit", client: "Ganesh youth assosiation - Guntur", category: "Promotions", year: "2025", poster_url: pt3, video_url: prom3, sort_order: 0, is_active: true },
  { id: "p23", title: "Freshers Party Edit", client: "RVR & JC College of Engineering", category: "Promotions", year: "2025", poster_url: pt4, video_url: prom4, sort_order: 0, is_active: true },
  { id: "p24", title: "Techfusion CSE Event Edit", client: "RVR & JC College of Engineering", category: "Promotions", year: "2025", poster_url: pt5, video_url: prom5, sort_order: 0, is_active: true },
  { id: "p25", title: "TechFusion Edit", client: "RVR & JC College of Engineering", category: "Promotions", year: "2025", poster_url: pt6, video_url: prom6, sort_order: 0, is_active: true },
  { id: "p26", title: "Techfusion promotion Edit", client: "RVR & JC College of Engineering", category: "Promotions", year: "2025", poster_url: pt7, video_url: prom7, sort_order: 0, is_active: true },
  { id: "p27", title: "Its Event Time Boys Edit", client: "RVR & JC College of Engineering", category: "Promotions", year: "2025", poster_url: pt8, video_url: prom8, sort_order: 0, is_active: true },
];

// Detect YouTube / Vimeo URLs
const isYouTube = (url: string) => /youtu\.?be/.test(url);
const isVimeo = (url: string) => /vimeo\.com/.test(url);

const youtubeEmbed = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1` : url;
};
const vimeoEmbed = (url: string) => {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}?autoplay=1` : url;
};

const Work = () => {
  const { videos: dbVideos, loading } = useWorkVideos();
  const projects = useMemo(() => (dbVideos.length > 0 ? dbVideos : FALLBACK), [dbVideos]);

  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<WorkVideo | null>(null);

  const filtered =
    active === "All"
      ? [
          ...projects.filter((p) => p.category === "Birthdays").slice(0, 2),
          ...projects.filter((p) => p.category === "Kids").slice(0, 2),
          ...projects.filter((p) => p.category === "Promotions").slice(0, 2),
          ...projects.filter((p) => p.category === "Shorts").slice(0, 2),
        ]
      : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="work" className="relative py-32">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold">
            Frames that <span className="text-gradient-primary">move people.</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-xs uppercase ${
                  active === c ? "border-primary bg-primary/15 text-white" : "border-white/10 text-gray-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">Loading work…</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setOpen(p)} />
            ))}
          </div>
        )}

        {active === "All" && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setActive("Birthdays")}
              className="rounded-full border border-primary px-6 py-3 text-sm uppercase hover:bg-primary/20"
            >
              View More Works
            </button>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-5" onClick={() => setOpen(null)}>
          <div className="max-w-5xl w-full bg-zinc-900 rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {isYouTube(open.video_url) ? (
              <iframe src={youtubeEmbed(open.video_url)} className="w-full aspect-video" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
            ) : isVimeo(open.video_url) ? (
              <iframe src={vimeoEmbed(open.video_url)} className="w-full aspect-video" allow="autoplay; fullscreen" allowFullScreen />
            ) : (
              <video src={open.video_url} controls autoPlay playsInline className="w-full max-h-[80vh]" poster={open.poster_url ?? undefined} />
            )}
            <div className="p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold">{open.title}</h3>
              <button onClick={() => setOpen(null)} className="rounded-full bg-red-500 p-2" aria-label="Close preview">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ProjectCard = ({ project, onOpen }: { project: WorkVideo; onOpen: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isExternal = isYouTube(project.video_url) || isVimeo(project.video_url);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v || isExternal) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (!v || isExternal) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-surface-raised transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.5)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {project.poster_url && (
          <img
            src={project.poster_url}
            alt={`${project.title} — ${project.client ?? ""}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
        )}
        {!isExternal && (
          <video
            ref={videoRef}
            src={project.video_url}
            loop
            playsInline
            preload="metadata"
            muted
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/30 to-transparent" />

        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-surface-deep/60 backdrop-blur-md transition-all group-hover:bg-primary group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)]">
          <Play className="h-4 w-4 text-foreground" fill="currentColor" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            {project.category}{project.year ? ` · ${project.year}` : ""}
          </div>
          <h3 className="mt-1.5 font-display text-xl leading-tight text-foreground">{project.title}</h3>
          {project.client && <div className="mt-1 text-xs text-muted-foreground">{project.client}</div>}
        </div>
      </div>
    </article>
  );
};

export default Work;
