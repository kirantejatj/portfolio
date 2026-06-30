import { motion } from "framer-motion";

const orbs = [
  { size: 420, x: "10%", y: "15%", color: "rgba(249,115,22,0.15)", duration: 18 },
  { size: 320, x: "75%", y: "60%", color: "rgba(251,146,60,0.12)", duration: 22 },
  { size: 260, x: "55%", y: "5%", color: "rgba(234,88,12,0.1)", duration: 16 },
  { size: 180, x: "85%", y: "20%", color: "rgba(251,191,36,0.08)", duration: 20 },
];

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 25, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default FloatingOrbs;
