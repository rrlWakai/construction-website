import Reveal from "../components/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 h-[40vh]">
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* BRAND */}
          <div className="md:col-span-4">
            <Reveal>
              <div className="text-lg font-semibold tracking-tight">
                YourConstructionCo
              </div>
              <p className="mt-3 max-w-sm text-sm text-white/65">
                Modern residential and commercial construction focused on
                clarity, craftsmanship, and reliable delivery.
              </p>
            </Reveal>
          </div>

          {/* NAV */}
          <div className="md:col-span-5">
            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <nav className="space-y-2 text-sm">
                  <div className="text-white/80 font-medium">Company</div>
                  <a
                    href="#services"
                    className="block text-white/60 hover:text-white transition"
                  >
                    Services
                  </a>
                  <a
                    href="#projects"
                    className="block text-white/60 hover:text-white transition"
                  >
                    Projects
                  </a>
                  <a
                    href="#testimonials"
                    className="block text-white/60 hover:text-white transition"
                  >
                    Testimonials
                  </a>
                </nav>

                <nav className="space-y-2 text-sm">
                  <div className="text-white/80 font-medium">Get Started</div>
                  <a
                    href="#contact"
                    className="block text-white/60 hover:text-white transition"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="#contact"
                    className="block text-white/60 hover:text-white transition"
                  >
                    Contact
                  </a>
                </nav>

                <nav className="space-y-2 text-sm">
                  <div className="text-white/80 font-medium">Legal</div>
                  <span className="block text-white/60">
                    Licensed & Insured
                  </span>
                  <span className="block text-white/60">Warranty Included</span>
                </nav>
              </div>
            </Reveal>
          </div>

          {/* CTA */}
          <div className="md:col-span-3">
            <Reveal delay={0.1}>
              <div className="glass-soft rounded-2xl p-5">
                <div className="text-sm font-medium text-white/90">
                  Ready to build?
                </div>
                <p className="mt-1 text-sm text-white/65">
                  Get a clear estimate and timeline.
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-95"
                >
                  Request a Quote
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row">
            <div>
              © {new Date().getFullYear()} YourConstructionCo. All rights
              reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Metro Manila</span>
              <span>•</span>
              <span>Cavite</span>
              <span>•</span>
              <span>Laguna</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
