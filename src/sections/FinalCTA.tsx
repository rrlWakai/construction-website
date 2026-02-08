import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "../components/Reveal";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /**
   * ✅ Smooth the scroll signal (prevents “steppy” transforms)
   * Higher damping = less bounce, more “cinematic”.
   */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  });

  /**
   * ✅ Background parallax (slow, premium)
   * Keep movement small + add tiny rotation to feel like camera drift.
   */
  const bgY = useTransform(smooth, [0, 1], ["-4%", "4%"]);
  const bgX = useTransform(smooth, [0, 1], ["-0.4%", "0.4%"]);
  const bgScale = useTransform(smooth, [0, 0.5, 1], [1.09, 1.06, 1.09]);
  const bgRotate = useTransform(smooth, [0, 1], ["-0.4deg", "0.4deg"]);

  /**
   * ✅ Micro “lens” feel (optional but nice)
   * Slight blur variation so it feels alive but not distracting.
   */
  const bgBlur = useTransform(smooth, [0, 0.5, 1], ["0px", "0.6px", "0px"]);

  /**
   * ✅ Content motion: ease-in then tiny lift out
   * Also fade-in early for cleaner entry.
   */
  const contentY = useTransform(smooth, [0, 0.25, 1], ["14px", "0px", "-10px"]);
  const contentOpacity = useTransform(smooth, [0, 0.18], [0, 1]);

  /**
   * ✅ Vignette + highlight drift
   */
  const vignetteOpacity = useTransform(smooth, [0, 1], [0.35, 0.58]);
  const auraX = useTransform(smooth, [0, 1], ["-1.2%", "1.2%"]);
  const auraOpacity = useTransform(smooth, [0, 0.35, 1], [0.55, 0.75, 0.55]);

  return (
    <section ref={ref} id="quote" className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* ✅ Single-image Parallax Layer */}
        <motion.div
          style={{
            y: bgY,
            x: bgX,
            scale: bgScale,
            rotate: bgRotate,
            filter: bgBlur,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/bg/final-cta-construction.webp')",
            }}
          />

          {/* ✅ Readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-black/85" />

          {/* ✅ Cinematic highlight */}
          <motion.div
            style={{ x: auraX, opacity: auraOpacity }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.10),transparent_55%)]" />
          </motion.div>
        </motion.div>

        {/* ✅ Vignette */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(0,0,0,0.78)_82%)]"
        />

        {/* Texture layers */}
        <div className="blueprint" />
        <div className="grain" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        {/* ✅ Cleaner cadence: tighter, more premium */}
        <Reveal>
          <div className="text-xs tracking-[0.22em] text-white/65">
            READY TO BUILD
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-5xl">
            Let’s build something modern—clean, durable, and delivered on time.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-white/70">
            Share your scope and timeline. We’ll respond with next steps, a
            clear estimate range, and a plan that respects your budget and
            schedule.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-xl bg-[rgb(var(--accent))] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
            >
              Request a Quote
            </a>
            <a
              href="#projects"
              className="rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:border-white/40"
            >
              View Projects
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 rounded-2xl glass-soft px-5 py-4 text-sm text-white/70">
            Licensed & insured • Clear timelines • Weekly updates • Quality
            finishes
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
