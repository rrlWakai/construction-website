import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "../components/Reveal";

const stats = [
  { label: "Years in craft", value: "12+" },
  { label: "Projects delivered", value: "180+" },
  { label: "Repeat clients", value: "60%" },
];

const values = [
  {
    title: "Design-forward planning",
    desc: "We align scope, budget, and execution details early—so the build feels calm and controlled.",
  },
  {
    title: "Built like a system",
    desc: "Clear phases, quality checks, and a clean handover—no guesswork, no chaos.",
  },
  {
    title: "On-site discipline",
    desc: "Safety-first, schedule-aware, and organized work areas that respect your space and timeline.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Content micro motion only (safe & subtle)
  const contentY = useTransform(scrollYProgress, [0, 1], ["6px", "-6px"]);

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="
        relative
        min-h-dvh
        overflow-hidden
        py-20 sm:py-28
        bg-[#00091c]  /* NAVY BASE */
      "
    >
      {/* BACKGROUND TEXTURE SYSTEM */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]
            bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
                linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            bg-size-[48px_48px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45" />

        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.55)_75%)]" />

        {/* Grain (optional, premium feel) */}
        <div className="grain" />
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 will-change-transform"
      >
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* LEFT */}
          <div className="md:col-span-6">
            <Reveal>
              <div className="max-w-xl">
                <div className="text-xs tracking-[0.22em] text-white/60">
                  ABOUT US
                </div>

                <h2
                  id="about-heading"
                  className="mt-3 text-2xl sm:text-3xl font-semibold leading-tight text-white"
                >
                  Calm builds, clean details, and a process you can trust.
                </h2>

                <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
                  We’re a construction team focused on modern execution—clear
                  planning, tight coordination, and craftsmanship that holds up
                  over time. From residential work to commercial fit-outs, we
                  keep the site organized and communication consistent.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#quote"
                    className="
                      inline-flex min-h-11 items-center justify-center
                      rounded-xl bg-[rgb(var(--accent))]
                      px-5 py-3 text-sm font-medium text-black
                      transition hover:brightness-95
                    "
                  >
                    Request a Quote
                  </a>

                  <a
                    href="#projects"
                    className="
                      inline-flex min-h-11 items-center justify-center
                      rounded-xl border border-white/25
                      bg-white/5 px-5 py-3 text-sm text-white/85
                      transition hover:bg-white/10 hover:border-white/40
                    "
                  >
                    View Projects →
                  </a>
                </div>

                {/* STATS */}
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {stats.map((s, i) => (
                    <Reveal key={s.label} delay={0.08 + i * 0.06}>
                      <div className="glass-soft rounded-2xl p-4 text-center">
                        <div className="text-xl sm:text-2xl font-semibold text-white">
                          {s.value}
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          {s.label}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-6">
            <div className="grid gap-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={0.06 + i * 0.07}>
                  <article
                    className="
                      glass-soft rounded-3xl p-6
                      transition hover:-translate-y-1
                      hover:border-white/25 hover:bg-white/10
                    "
                  >
                    <div className="text-xs tracking-[0.18em] text-white/50">
                      0{i + 1}
                    </div>
                    <h3 className="mt-2 text-base sm:text-lg font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed">
                      {v.desc}
                    </p>
                    <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
