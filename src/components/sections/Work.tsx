import { useEffect, useRef, useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";
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

//kids videos and thumbnails
import c1t from "@/assets/thumbnails/c1.png";
import c2t from "@/assets/thumbnails/c2.png";
import c3t from "@/assets/thumbnails/c3.png";
import c4t from "@/assets/thumbnails/c4.png";
import c1 from "@/assets/portfolio/c1.mp4";
import c2 from "@/assets/portfolio/c2.mp4";
import c3 from "@/assets/portfolio/c3.mp4";
import c4 from "@/assets/portfolio/c4.mp4";
import c5t from "@/assets/thumbnails/c5.png";
import c5 from "@/assets/portfolio/c5.mp4";

//boys videos and thumbnails
import by1 from "@/assets/portfolio/boys1.mp4";
import by2 from "@/assets/portfolio/boys2.mp4";
import by3 from "@/assets/portfolio/boys3.mp4";
import by4 from "@/assets/portfolio/boys4.mp4";
import byt1 from "@/assets/thumbnails/bt1.png";
import byt2 from "@/assets/thumbnails/bt2.png";
import byt3 from "@/assets/thumbnails/bt3.png";
import byt4 from "@/assets/thumbnails/bt4.png";

//shorts videos and thumbnails
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

//promotions videos and thumbnails
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

// import t3 from "@/assets/thumbnails/b3.png";

type Category = "All" | "Birthdays" | "Kids" | "Promotions" | "Shorts";

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
const SAMPLE_VIDEO = b1;
const SAMPLE_VIDEO_2 = b2;
const SAMPLE_VIDEO_3 = b3;
const SAMPLE_VIDEO_4 = b4;
const SAMPLE_VIDEO_5 = b5;

//kids edits
const kv1 = c1;
const kv2 = c2;
const kv3 = c3;
const kv4 = c4;
const kv5 = c5;

//boys edits
const byv1 = by1;
const byv2 = by2;
const byv3 = by3;
const byv4 = by4;

//shorts edits
const sv1 = s1;
const sv2 = s2;
const sv3 = s3;
const sv4 = s4;
const sv5 = s5;

//promotions edits
const pv1 = prom1;
const pv2 = prom2;
const pv3 = prom3;
const pv4 = prom4;
const pv5 = prom5;
const pv6 = prom6;
const pv7 = prom7;
const pv8 = prom8;


const projects: Project[] = [
  {
    id: "p1",
    title: "Akhila Bevara Birthday Edit Mashup",
    client: "Akhila",
    category: "Birthdays",
    year: "2026",
    poster: t1,
    preview: SAMPLE_VIDEO,
    embed: SAMPLE_VIDEO,
  },
  {
    id: "p2",
    title: "Bhavya sri Birthday Edit",
    client: "Birthday",
    category: "Birthdays",
    year: "2026",
    poster: t2,
    preview: SAMPLE_VIDEO_2,
    embed: SAMPLE_VIDEO_2,
  },
  {
    id: "p3",
    title: "Dhanvika Diya Birthday Edit",
    client: "Diya",
    category: "Birthdays",
    year: "2024",
    poster: t3,
    preview: SAMPLE_VIDEO_3,
    embed: SAMPLE_VIDEO_3,
  },
  {
    id: "p4",
    title: "Nandu Birthday Edit",
    client: "Nandu",
    category: "Birthdays",
    year: "2024",
    poster: t5,
    preview: SAMPLE_VIDEO_5,
    embed: SAMPLE_VIDEO_5,
  },
  {
    id: "p5",
    title: "Sri Shainy Birthday Edit",
    client: "Sri Shainy",
    category: "Birthdays",
    year: "2024",
    poster: t4,
    preview: SAMPLE_VIDEO_4,
    embed: SAMPLE_VIDEO_4,
  },
  //kids edits
  {
    id: "p6",
    title: "Dhanvika Diya Edit",
    client: "Dhanvika Diya",
    category: "Kids",
    year: "2025",
    poster: c1t,
    preview: kv1,
    embed: kv1,
  },
  {
    id: "p7",
    title: "Stories by Vihaa Edit",
    client: "Vihaa",
    category: "Kids",
    year: "2025",
    poster: c2t,
    preview: kv2,
    embed: kv2,
  },
  {
    id: "p8",
    title: "Diya Edit 2025",
    client: "Dhanvika Diya",
    category: "Kids",
    year: "2025",
    poster: c3t,
    preview: kv3,
    embed: kv3,
  },
  {
    id: "p9",
    title: "Kids Trending Edit",
    client: "Dhanvika Diya",
    category: "Kids",
    year: "2025",
    poster: c4t,
    preview: kv4,
    embed: kv4,
  },
  {
    id: "p10",
    title: "Kids Special Edit",
    client: "Dhanvika Diya",
    category: "Kids",
    year: "2025",
    poster: c5t,
    preview: kv5,
    embed: kv5,
  },
  //boys edits
  {
    id: "p11",
    title: "Boys Trending Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: byt1,
    preview: byv1,
    embed: byv1,
  },
  {
    id: "p12",
    title: "Boys Special Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: byt2,
    preview: byv2,
    embed: byv2,
  },
  {
    id: "p13",
    title: "Boys Editor Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: byt3,
    preview: byv3,
    embed: byv3,
  },
  {
    id: "p14",
    title: "Boys Style Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: byt4,
    preview: byv4,
    embed: byv4,
  },
  //shorts edits
  {
    id: "p15",
    title: "Shorts Trending Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: st1,
    preview: sv1,
    embed: sv1,
  },
  {
    id: "p16",
    title: "Shorts Special Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: st2,
    preview: sv2,
    embed: sv2,
  },
  {
    id: "p17",
    title: "Shorts Editor Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: st3,
    preview: sv3,
    embed: sv3,
  },
  {
    id: "p18",
    title: "Shorts Style Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: st4,
    preview: sv4,
    embed: sv4,
  },
  {
    id: "p19",
    title: "Shorts Highlight Edit",
    client: "Narasimha",
    category: "Shorts",
    year: "2025",
    poster: st5,
    preview: sv5,
    embed: sv5,
  },
  //promotions edits
  {
    id: "p20",
    title: "Home unlocking Edit",
    client: "Bhavani",
    category: "Promotions",
    year: "2025",
    poster: pt1,
    preview: pv1,
    embed: pv1,
  },
  {
    id: "p21",
    title: "Tech Fest Edit",
    client: "RVR & JC College of Engineering",
    category: "Promotions",
    year: "2025",
    poster: pt2,
    preview: pv2,
    embed: pv2,
  },
  {
    id: "p22",
    title: "Ganesh chavithi Edit",
    client: "Ganesh youth assosiation - Guntur",
    category: "Promotions",
    year: "2025",
    poster: pt3,
    preview: pv3,
    embed: pv3,
  },
  {
    id: "p23",
    title: "Freshers Party Edit",
    client: "RVR & JC College of Engineering",
    category: "Promotions",
    year: "2025",
    poster: pt4,
    preview: pv4,
    embed: pv4,
  },
  {
    id: "p24",
    title: "Techfusion CSE Event Edit",
    client: "RVR & JC College of Engineering",
    category: "Promotions",
    year: "2025",
    poster: pt5,
    preview: pv5,
    embed: pv5,
  },
  {
    id: "p25",
    title: "TechFusion Edit",
    client: "RVR & JC College of Engineering",
    category: "Promotions",
    year: "2025",
    poster: pt6,
    preview: pv6,
    embed: pv6,
  },
  {
    id: "p26",
    title: "Techfusion promotion Edit",
    client: "RVR & JC College of Engineering",
    category: "Promotions",
    year: "2025",
    poster: pt7,
    preview: pv7,
    embed: pv7,
  },
  {
    id: "p27",
    title: "Its Event Time Boys Edit",
    client: "RVR & JC College of Engineering",
    category: "Promotions",
    year: "2025",
    poster: pt8,
    preview: pv8,
    embed: pv8,
  },
];

const categories: Category[] = ["All", "Birthdays", "Kids", "Promotions", "Shorts"];

// const Work = () => {
//   const [active, setActive] = useState<Category>("All");
//   const [open, setOpen] = useState<Project | null>(null);
//   const sectionRef = useRef<HTMLElement>(null);

//   const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) {
//             e.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
//               setTimeout(() => el.classList.add("revealed"), i * 80);
//             });
//           }
//         });
//       },
//       { threshold: 0.15 },
//     );
//     if (sectionRef.current) obs.observe(sectionRef.current);
//     return () => obs.disconnect();
//   }, []);

//   // Lock scroll when modal open + ESC to close
//   useEffect(() => {
//     if (!open) return;
//     document.body.style.overflow = "hidden";
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpen(null);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = "";
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [open]);

//   return (
//     <section id="work" ref={sectionRef} className="relative py-32">
//       <style>{`
//         [data-reveal] { opacity: 0; transform: translateY(28px); transition: all 0.8s var(--ease-out-expo); }
//         [data-reveal].revealed { opacity: 1; transform: translateY(0); }
//       `}</style>

//       <div className="container mx-auto">
//         <div className="mb-12 flex items-center gap-4" data-reveal>
//           <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ 02</span>
//           <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
//           <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected Work</span>
//         </div>

//         <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end" data-reveal>
//           <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
//             <span className="text-foreground">Frames that</span>{" "}
//             <span className="text-gradient-primary">move people.</span>
//           </h2>

//           <div className="flex flex-wrap gap-2">
//             {categories.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setActive(c)}
//                 data-cursor="hover"
//                 className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
//                   active === c
//                     ? "border-primary bg-primary/15 text-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
//                     : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-foreground"
//                 }`}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filtered.map((p) => (
//             <ProjectCard key={p.id} project={p} onOpen={() => setOpen(p)} />
//           ))}
//         </div>
//       </div>

//       {open && (
//         <div
//           className="fixed inset-0 z-[200] flex items-center justify-center bg-surface-deep/95 p-4 backdrop-blur-xl animate-fade-in"
//           onClick={() => setOpen(null)}
//         >
//           <button
//             onClick={() => setOpen(null)}
//             data-cursor="hover"
//             aria-label="Close"
//             className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-primary hover:bg-primary/20"
//           >
//             <X className="h-5 w-5" />
//           </button>

//           <div
//             className="relative w-full max-w-6xl overflow-hidden rounded-2xl glass-strong animate-scale-in"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="aspect-video w-full bg-black">
//               <video
//                 src={open.embed}
//                 controls
//                 autoPlay
//                 className="h-full w-full"
//                 poster={open.poster}
//               />
//             </div>
//             <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
//                   {open.client} · {open.year}
//                 </div>
//                 <div className="mt-1 font-display text-2xl text-foreground">{open.title}</div>
//               </div>
//               <a
//                 href="#contact"
//                 data-cursor="hover"
//                 onClick={() => setOpen(null)}
//                 className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground hover:bg-primary/20"
//               >
//                 Discuss a project <ExternalLink className="h-3.5 w-3.5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
const Work = () => {
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Show only few samples in ALL
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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
                  active === c
                    ? "border-primary bg-primary/15 text-white"
                    : "border-white/10 text-gray-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* videos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={() => setOpen(p)}
            />
          ))}
        </div>

        {/* More button only in ALL */}
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-w-5xl w-full bg-zinc-900 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={open.embed}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh]"
              poster={open.poster}
            />

            <div className="p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold">{open.title}</h3>

              <button
                onClick={() => setOpen(null)}
                className="rounded-full bg-red-500 p-2"
                aria-label="Close preview"
                title="Close preview"
              >
                <X size={18} />
              </button>
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
          loop
          playsInline
          preload="metadata"
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
