import Reveal from "../components/Reveal";
import ProjectFrame from "../components/ProjectFrame";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Kuchen Remodel",
    subtitle: "Warm minimal interiors with structural upgrades.",
    meta: "Residential • 6 weeks • Concrete + Timber",
    img: "/projects/featured-1.jpg",
    grade: {
      tint: "rgba(255, 214, 160, 0.10)",
      lift: 0.1,
      crush: 0.28,
    },
  },
  {
    title: "Studio Office Fit-Out",
    subtitle: "Clean workflow layout with acoustic planning.",
    meta: "Commercial • 4 weeks • Glass + Steel",
    img: "/projects/featured-2.jpg",
    grade: {
      tint: "rgba(170, 205, 255, 0.08)",
      lift: 0.08,
      crush: 0.3,
    },
  },
  {
    title: "Retail Buildout",
    subtitle: "High-traffic layout with durable detailing.",
    meta: "Retail • 3 weeks • Stone + Laminate",
    img: "/projects/featured-3.jpg",
    grade: {
      tint: "rgba(255, 220, 190, 0.09)",
      lift: 0.08,
      crush: 0.32,
    },
  },
];

export default function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const totalHeight = `${projects.length * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pageProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, projects.length],
  );

  /* Safer index switching */
  useMotionValueEvent(pageProgress, "change", (v) => {
    const idx = Math.floor(v + 0.15);
    setActive(Math.min(projects.length - 1, Math.max(0, idx)));
  });

  /* Motion tuning */
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.03]);
  const auraX = useTransform(scrollYProgress, [0, 1], ["-1%", "1%"]);
  const auraOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.7]);

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.img;
    });
  }, []);

  const grade = projects[active].grade;

  return (
    <section
      ref={ref}
      id="projects"
      className="relative"
      style={{ height: totalHeight }}
    >
      <div className="sticky top-0 min-h-[100svh] overflow-hidden">
        {/* BACKGROUND */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="pointer-events-none absolute inset-0 -z-20"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/bg/featured-atmosphere.webp')" }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.55)_75%)]" />

          {/* Grade */}
          <div
            className="absolute inset-0 mix-blend-soft-light transition-colors duration-700"
            style={{ backgroundColor: grade.tint }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: grade.lift }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(255,255,255,0.18),transparent_60%)]" />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: grade.crush }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,0.65)_72%)]" />
          </div>
        </motion.div>

        {/* Atmosphere */}
        <motion.div
          style={{ x: auraX, opacity: auraOpacity }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(255,255,255,0.07),transparent_60%)]" />
        </motion.div>

        {/* CONTENT */}
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
          {/* TEXT */}
          <div className="order-1 md:order-none">
            <Reveal>
              <div className="glass-soft rounded-3xl border border-white/15 p-6 md:p-8 max-w-xl">
                <div className="text-xs tracking-[0.22em] text-white/60">
                  FEATURED PROJECT
                </div>

                <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
                  {projects[active].title}
                </h2>

                <p className="mt-3 text-white/70">
                  {projects[active].subtitle}
                </p>

                <div className="mt-3 text-sm text-white/60">
                  {projects[active].meta}
                </div>

                {/* Progress */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-sm text-white/60">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>

                  <div className="flex gap-2">
                    {projects.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-6 rounded-full transition ${
                          i === active ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* IMAGE */}
          <div className="order-2 md:order-none">
            <div className="relative h-[52vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-3xl glass-soft border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              {projects.map((p, i) => (
                <ProjectFrame
                  key={p.title}
                  img={p.img}
                  title={p.title}
                  index={i}
                  scrollYProgress={pageProgress}
                />
              ))}

              <div className="blueprint" />
              <div className="grain" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.45)_70%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
