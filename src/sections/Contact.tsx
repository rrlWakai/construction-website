import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Reveal from "../components/Reveal";

/* ---------- types ---------- */
type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

type Touched = Partial<Record<keyof FormState, boolean>>;

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "Residential",
  budget: "Under ₱500k",
  message: "",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cx(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* ---------- motion (SAFE + LIGHTWEIGHT) ---------- */
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0px", "0px"] : ["10px", "-6px"],
  );

  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0.35, 0.35] : [0.25, 0.45],
  );

  /* ---------- form state ---------- */
  const [form, setForm] = useState<FormState>(initial);
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!emailRe.test(form.email.trim()))
      e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Tell us a bit about your project.";
    return e;
  }, [form]);

  const showError = (k: keyof FormState) =>
    (submitted || touched[k]) && Boolean(errors[k]);

  const onChange = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const onBlur = (key: keyof FormState) =>
    setTouched((p) => ({ ...p, [key]: true }));

  const inputBase =
    "h-12 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-[15px] text-white/90 outline-none transition";
  const focusRing = "focus:border-white/30 focus:bg-white/10";
  const errorRing = "border-red-400/60 focus:border-red-300/70";
  const label = "text-xs tracking-[0.18em] text-white/60";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    alert("Thanks! We’ll get back to you within 24 hours.");
    setForm(initial);
    setTouched({});
    setSubmitted(false);
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#0b1220] py-24 sm:py-28"
    >
      {/* ---------- BACKGROUND ---------- */}
      <div className="absolute inset-0 -z-10">
        {/* Grid texture */}
        <div
          className="
            absolute inset-0
            opacity-[0.06]
            bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
            bg-size-[56px_56px]
          "
        />

        {/* Depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/55" />

        {/* Vignette */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.75)_80%)]
          "
        />
      </div>

      {/* ---------- CONTENT ---------- */}
      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* LEFT */}
          <div className="md:col-span-5">
            <Reveal>
              <div className="text-xs tracking-[0.22em] text-white/65">
                CONTACT
              </div>

              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Request a quote.
              </h2>

              <p className="mt-4 max-w-md text-sm text-white/70 sm:text-base">
                Tell us your scope, target timeline, and location. We’ll reply
                with next steps and a clear estimate range.
              </p>

              <div className="mt-8 space-y-3">
                <div className="glass-soft rounded-xl px-5 py-4 text-sm">
                  <div className="font-medium text-white/90">Response time</div>
                  <div className="mt-1 text-white/70">
                    Typically within 24 hours (Mon–Sat)
                  </div>
                </div>

                <div className="glass-soft rounded-xl px-5 py-4 text-sm">
                  <div className="font-medium text-white/90">Service areas</div>
                  <div className="mt-1 text-white/70">
                    Metro Manila • Cavite • Laguna • Batangas
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7">
            <Reveal delay={0.05}>
              <form
                onSubmit={handleSubmit}
                className="glass rounded-3xl border border-white/15 p-6 sm:p-8"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <div className={label}>NAME *</div>
                    <input
                      value={form.name}
                      onChange={(e) => onChange("name", e.currentTarget.value)}
                      onBlur={() => onBlur("name")}
                      className={cx(
                        inputBase,
                        focusRing,
                        showError("name") && errorRing,
                      )}
                      aria-invalid={showError("name")}
                    />
                    <div className="mt-2 min-h-[18px] text-sm text-red-300/90">
                      {showError("name") && errors.name}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className={label}>EMAIL *</div>
                    <input
                      value={form.email}
                      onChange={(e) => onChange("email", e.currentTarget.value)}
                      onBlur={() => onBlur("email")}
                      className={cx(
                        inputBase,
                        focusRing,
                        showError("email") && errorRing,
                      )}
                      aria-invalid={showError("email")}
                    />
                    <div className="mt-2 min-h-[18px] text-sm text-red-300/90">
                      {showError("email") && errors.email}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <div className={label}>PROJECT DETAILS *</div>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        onChange("message", e.currentTarget.value)
                      }
                      onBlur={() => onBlur("message")}
                      className={cx(
                        "min-h-[140px] w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-[15px] text-white/90 outline-none transition",
                        focusRing,
                        showError("message") && errorRing,
                      )}
                      aria-invalid={showError("message")}
                    />
                    <div className="mt-2 min-h-[18px] text-sm text-red-300/90">
                      {showError("message") && errors.message}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/60">
                    We’ll only contact you about your project.
                  </p>

                  <button
                    type="submit"
                    className="rounded-xl bg-[rgb(var(--accent))] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
