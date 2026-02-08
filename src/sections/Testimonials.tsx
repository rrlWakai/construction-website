import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";
import Reveal from "../components/Reveal";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  img: string;
};

type Faq = {
  q: string;
  a: string;
};

const faqs: Faq[] = [
  {
    q: "How long does a project take?",
    a: "Timelines vary by scope, but we’ll provide a clear schedule after site review and planning—then keep you updated weekly.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We’re fully licensed and insured, and we can provide documentation upon request.",
  },
  {
    q: "What is the payment schedule?",
    a: "Typically: deposit to start, milestone payments during construction, and final payment upon handover.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes. We offer workmanship warranty and guide you through supplier warranties.",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "John M.",
    role: "Homeowner",
    quote:
      "Clear timelines, honest pricing, and the finish quality was exactly what we hoped for.",
    img: "/testimonials/john.jpg",
  },
  {
    name: "Sarah L.",
    role: "Business Owner",
    quote:
      "They handled our fit-out professionally—clean execution, no surprises.",
    img: "/sarah.jpg",
  },
  {
    name: "David R.",
    role: "Project Manager",
    quote:
      "Reliable team and strong attention to detail from start to turnover.",
    img: "/david.jpg",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Safer motion ranges */
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.02]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["6px", "-8px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const rows = useMemo(() => faqs.map((f, i) => ({ ...f, i })), []);

  /* Auto-advance (pauses on interaction) */
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActive((v) => (v + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(t);
  }, [paused]);

  const current = testimonials[active];

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative min-h-[100svh] overflow-hidden bg-[#0b1220] py-24 sm:py-28"
    >
      {/* BACKGROUND */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-[0.06]
            bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
                linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            bg-size-[48px_48px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl px-5 sm:px-6"
      >
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* LEFT */}
          <div className="md:col-span-6">
            <Reveal>
              <div className="mb-8 max-w-xl">
                <div className="text-xs tracking-[0.22em] text-white/60">
                  CLIENT FEEDBACK
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
                  Trusted by clients
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/70">
                  Calm execution, clear communication, and dependable delivery.
                </p>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal delay={0.06}>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5 sm:p-6">
                <div className="mb-4 text-xs tracking-[0.22em] text-white/60">
                  COMMON QUESTIONS
                </div>

                <div className="grid gap-3">
                  {rows.map(({ q, a, i }) => {
                    const isOpen = open === i;
                    return (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:bg-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white/90">
                            {q}
                          </span>
                          <span
                            className={`transition ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▾
                          </span>
                        </div>

                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="pt-3 text-sm text-white/70">{a}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT – TESTIMONIAL */}
          <div className="md:col-span-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                {/* Controls */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xs tracking-[0.22em] text-white/60">
                    REVIEW
                  </div>
                  <div className="flex gap-2">
                    {["←", "→"].map((icon, dir) => (
                      <button
                        key={icon}
                        onClick={() => {
                          setPaused(true);
                          setActive(
                            (v) =>
                              (v + (dir ? 1 : -1) + testimonials.length) %
                              testimonials.length,
                          );
                        }}
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid gap-5"
                >
                  <p className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/80">
                    “{current.quote}”
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={current.img}
                      alt={current.name}
                      className="h-14 w-14 rounded-2xl object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-sm font-semibold">
                        {current.name}
                      </div>
                      <div className="text-xs text-white/65">
                        {current.role}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Dots */}
                <div className="mt-6 flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPaused(true);
                        setActive(i);
                      }}
                      className={`h-2 rounded-full transition ${
                        i === active ? "w-7 bg-white/40" : "w-2 bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
