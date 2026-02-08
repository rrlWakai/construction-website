import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

export default function BackgroundProvider({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Very slow cinematic drift (entire site)
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.02]);

  return (
    <div ref={ref} className="relative">
      {/* MASTER BACKGROUND */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none fixed inset-0 -z-50"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg/master-atmosphere.webp')",
          }}
        />

        {/* Global contrast control */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85" />

        {/* Global vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.6)_75%)]" />

        {/* Film grain (optional, subtle) */}
        <div className="grain absolute inset-0" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
