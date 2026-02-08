import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /**
   * Parallax tuning
   * - Reduced movement for mobile safety
   */
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0px", "22px"]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* LAYER 1: HERO IMAGE */}
      <motion.div
        style={{ y: heroImgY }}
        className="
          absolute inset-0
          bg-[url('/hero.webp')]
          bg-cover bg-center
          will-change-transform
        "
      />

      {/* LAYER 2: GRADING */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_55%)]" />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          mx-auto flex min-h-screen max-w-6xl
          items-center
          px-4 pt-28 pb-24
          sm:px-6
        "
      >
        <motion.div
          style={{ y: cardY }}
          className="
            glass
            w-full max-w-xl
            rounded-3xl
            p-6 sm:p-8
          "
        >
          <div className="text-xs tracking-[0.18em] text-white/65">
            LICENSED • INSURED • WARRANTY
          </div>

          <h1
            className="
              mt-3
              text-3xl font-semibold leading-[1.1]
              sm:text-4xl
              md:text-5xl
            "
          >
            We build spaces that last.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/80">
            Clear timelines. Honest pricing. Premium craftsmanship for homes and
            commercial spaces.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="
                inline-flex justify-center
                rounded-xl
                bg-[rgb(var(--accent))]
                px-5 py-3
                text-sm font-medium
                text-black
                transition hover:brightness-95
              "
            >
              Request a Quote
            </a>

            <a
              href="#projects"
              className="
                inline-flex justify-center
                rounded-xl
                border border-white/25
                px-5 py-3
                text-sm text-white
                transition hover:bg-white/5
              "
            >
              View Projects
            </a>
          </div>
        </motion.div>
      </div>

      {/* TRUST STRIP */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="
              glass-soft
              rounded-2xl
              px-4 py-3
              text-xs sm:text-sm
              text-white/80
            "
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-start">
              <span>15+ Years</span>
              <span>200+ Builds</span>
              <span>Transparent Estimates</span>
              <span>Safety-first teams</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
