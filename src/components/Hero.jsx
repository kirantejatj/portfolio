import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "../utils/motionVariants";

const roles = ["Oracle Apps DBA", "SQL Server DBA", "Python Django Developer"];

const nameParts = ["KOTAGIRI", "KIRAN", "TEJA"];

function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen mesh-bg flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Orbiting ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          className="orbit-ring w-[520px] h-[520px] spin-slow absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="orbit-dot absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        <motion.div
          className="orbit-ring w-[680px] h-[680px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-40"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <div className="orbit-dot absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-60" />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-orange-400 text-sm font-medium mb-10 animate-float"
          >
            <Sparkles size={16} className="text-amber-400" />
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Available for opportunities
          </motion.span>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-zinc-400 text-sm mb-6 tracking-widest uppercase"
          >
            Hello, I&apos;m
          </motion.p>

          <div className="mb-8 overflow-hidden">
            {nameParts.map((part, row) => (
              <div key={part} className="flex justify-center gap-2 md:gap-4 flex-wrap">
                {part.split("").map((char, i) => (
                  <motion.span
                    key={`${part}-${i}`}
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.4 + row * 0.15 + i * 0.04,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight ${
                      row === 0 ? "gradient-text" : "text-white"
                    }`}
                    style={{ transformPerspective: 600 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {roles.map((role, i) => (
              <motion.span
                key={role}
                whileHover={{ scale: 1.08, y: -4, rotate: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="px-5 py-2.5 rounded-full glass-card text-sm md:text-base text-zinc-200 font-medium cursor-default"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {role}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-10 text-zinc-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            4+ years crafting reliable enterprise database systems — performance tuning,
            backup & recovery, and automation at scale.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-14 flex flex-col sm:flex-row justify-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full btn-glossy text-white font-semibold text-base z-10"
            >
              <Download size={18} />
              Download Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full btn-glass text-orange-400 font-semibold text-base"
            >
              <Mail size={18} />
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => scrollToSection("about")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors group"
          aria-label="Scroll to about"
        >
          <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;
