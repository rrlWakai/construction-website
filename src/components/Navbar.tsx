import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/ui";
import { useScrollY } from "../lib/useScrollY";

export default function Navbar() {
  const y = useScrollY();
  const scrolled = y > 10;

  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 md:px-6 md:pt-5">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 transition-all duration-300",
            scrolled ? "glass" : "glass-soft",
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 border border-white/15">
                <span className="text-sm font-semibold">BW</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wide">
                  BUILDWORKS
                </div>
                <div className="text-xs text-white/60">Construction</div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 md:flex">
              {["About", "Services", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/75 hover:text-white transition"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              <a
                href="#quote"
                className="hidden rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-black transition hover:brightness-95 md:inline-flex"
              >
                Request a Quote
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white md:hidden"
                aria-label="Toggle menu"
              >
                <span className="sr-only">Menu</span>
                <div className="relative h-4 w-4">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-0.5 w-full bg-white transition",
                      open && "translate-y-[7px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-[7px] h-0.5 w-full bg-white transition",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 bottom-0 h-0.5 w-full bg-white transition",
                      open && "-translate-y-[7px] -rotate-45",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-[88px] z-40 mx-auto max-w-6xl px-4 md:hidden"
          >
            <div className="glass rounded-3xl p-6">
              <nav className="flex flex-col gap-5">
                {["About", "Services", "Projects", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-white/85 transition hover:text-white"
                  >
                    {item}
                  </a>
                ))}

                <a
                  href="#quote"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-full justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-3 text-sm font-semibold text-black transition hover:brightness-95"
                >
                  Request a Quote
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
