import { motion } from "framer-motion";
import Stars from "./Stars";
import Particles from "./Particles";
import FloatingOrbs from "./FloatingOrbs";
import useMousePosition from "../hooks/useMousePosition";

export default function AnimatedBackground() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      animate={{
        x,
        y,
      }}
      transition={{
        type: "spring",
        stiffness: 30,
        damping: 20,
        mass: 0.5,
      }}
    >
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      {/* Stars */}
      <Stars />

      {/* Particles */}
      <Particles />

      {/* Existing Floating Orbs */}
      <FloatingOrbs />

      {/* Extra Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
    </motion.div>
  );
}