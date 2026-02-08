import { motion, useTransform, type MotionValue } from "framer-motion";

type Props = {
  img: string;
  title: string;
  index: number;
  scrollYProgress: MotionValue<number>; // pageProgress (0..N)
};

export default function ProjectFrame({
  img,
  title,
  index,
  scrollYProgress,
}: Props) {
  // Visibility window
  const opacity = useTransform(
    scrollYProgress,
    [index - 0.65, index, index + 0.65],
    [0, 1, 0],
  );

  // Depth drift
  const y = useTransform(
    scrollYProgress,
    [index - 1, index, index + 1],
    ["10px", "0px", "-10px"],
  );
  const x = useTransform(
    scrollYProgress,
    [index - 1, index, index + 1],
    ["-8px", "0px", "8px"],
  );

  const scale = useTransform(
    scrollYProgress,
    [index - 1, index, index + 1],
    [1.08, 1.02, 1.08],
  );

  // ---- Exposure shift (stronger) ----
  // Peak at center (index), lower on edges
  // lift +0.03 (brighten mid/shadows) + crush +0.04 (contrast blacks)
  // We'll approximate with:
  // - brightness bump near center
  // - contrast bump near center
  // - slight shadow "lift" overlay near center
  const brightness = useTransform(
    scrollYProgress,
    [index - 0.6, index, index + 0.6],
    [0.98, 1.03, 0.98], // +0.03 peak
  );

  const contrast = useTransform(
    scrollYProgress,
    [index - 0.6, index, index + 0.6],
    [1.0, 1.04, 1.0], // +0.04 peak
  );

  // Shadow lift overlay (subtle light fog only at peak)
  const liftOpacity = useTransform(
    scrollYProgress,
    [index - 0.6, index, index + 0.6],
    [0.0, 0.1, 0.0], // reads as "lift"
  );

  // Extra black crush vignette (slightly stronger at peak)
  const crushOpacity = useTransform(
    scrollYProgress,
    [index - 0.6, index, index + 0.6],
    [0.22, 0.3, 0.22], // reads as "crush"
  );

  const zIndex = 10 + index;

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, x, y, scale, zIndex }}
    >
      <motion.img
        src={img}
        alt={title}
        draggable={false}
        loading="lazy"
        className="h-full w-full object-cover will-change-transform"
        style={{
          filter: useTransform(
            [brightness, contrast],
            ([b, c]) => `brightness(${b}) contrast(${c})`,
          ),
        }}
      />

      {/* Lift (adds exposure in shadows) */}
      <motion.div
        style={{ opacity: liftOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(255,255,255,0.18),transparent_60%)]"
      />

      {/* Film grade (keeps cinematic) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Crush (deepen blacks + vignette) */}
      <motion.div
        style={{ opacity: crushOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,0.65)_72%)]"
      />
    </motion.div>
  );
}
