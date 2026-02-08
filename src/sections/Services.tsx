import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "../components/Reveal";

type Service = {
  title: string;
  desc: string;
  img: string;
};

const services: Service[] = [
  {
    title: "Residential Construction",
    desc: "Custom homes, additions, and remodels built to last.",
    img: "/services/residential.jpg",
  },
  {
    title: "Commercial Construction",
    desc: "Office spaces, retail, and buildouts—built for business.",
    img: "/services/commercial.jpg",
  },
  {
    title: "Retail Buildouts",
    desc: "Upgrade, renovate, or create your ideal retail space.",
    img: "/services/retail.jpg",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Far sky (slow)
  const farY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const farX = useTransform(scrollYProgress, [0, 1], ["-0.6%", "0.6%"]);
  const farOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.18, 0.25, 0.18],
  );

  // Near clouds (faster)
  const nearY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const nearX = useTransform(scrollYProgress, [0, 1], ["1.1%", "-1.1%"]);
  const nearOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.22, 0.34, 0.22],
  );

  // Slight content depth (keep subtle for FPS)
  const contentY = useTransform(scrollYProgress, [0, 1], ["8px", "-8px"]);

  return (
    <section
      ref={ref}
      id="services"
      className="section-services relative h-screen overflow-hidden"
    >
      {/* Background system (B + C) */}
      <div className="absolute inset-0 -z-10">
        {/* Far sky */}
        <motion.div
          style={{ y: farY, x: farX, opacity: farOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('public/bg-sky-far.jpg')" }}
          />
        </motion.div>

        {/* Near clouds */}
        <motion.div
          style={{ y: nearY, x: nearX, opacity: nearOpacity }}
          className="pointer-events-none absolute inset-0 will-change-transform"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/bg-sky-near.png')" }}
          />
        </motion.div>

        {/* Film grade overlays */}
        <div className="absolute inset-0 section-grade" />
        <div className="absolute inset-0 section-vignette opacity-60" />
        <div className="absolute inset-0 section-seam" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 will-change-transform"
      >
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="text-xs tracking-[0.22em] text-white/65">
              OUR SERVICES
            </div>
            <h2 className="mt-3 text-3xl font-semibold">Our Services</h2>
            <p className="mx-auto mt-3 text-white/70">
              Clear scope, clean execution, and a team you can rely on—built for
              quality and timelines.
            </p>
          </div>
        </Reveal>

        {/* Slightly tighter cards (more editorial) */}
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <article
                className="
                  group overflow-hidden rounded-3xl
                  glass-soft
                  transition duration-300
                  hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                  will-change-transform
                "
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {s.desc}
                  </p>
                  <span className="mt-5 inline-flex text-sm text-white/80">
                    Learn More →
                  </span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 flex justify-center">
            <a
              href="#projects"
              className="
                rounded-xl border border-white/25
                px-6 py-3 text-sm text-white/85
                transition
                hover:bg-white/10 hover:border-white/40
              "
            >
              View All Projects →
            </a>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
