import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Server, Code2 } from "lucide-react";
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from "../utils/motionVariants";

const highlights = [
  { icon: Database, title: "Oracle EBS", desc: "Administration, tuning & support" },
  { icon: Server, title: "SQL Server", desc: "Production DBA & automation" },
  { icon: Code2, title: "Development", desc: "Python, Django & React" },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "50+", label: "DB Instances" },
  { value: "99.9%", label: "Uptime Focus" },
];

function AnimatedCounter({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      className="text-3xl md:text-4xl font-bold gradient-text"
    >
      {value}
    </motion.span>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 bg-[#050506] overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-label">About Me</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Building databases that{" "}
            <span className="gradient-text">never sleep</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-3 gap-4 mb-16 max-w-lg"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.08, y: -6 }}
              className="glass-card rounded-2xl p-4 md:p-5 text-center"
            >
              <AnimatedCounter value={stat.value} />
              <p className="text-xs md:text-sm text-zinc-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="gloss-border"
          >
            <div className="gloss-border-inner p-8 md:p-10">
              <p className="text-lg text-zinc-400 leading-relaxed mb-6">
                I&apos;m{" "}
                <span className="text-orange-400 font-semibold">Kotagiri Kiran Teja</span>,
                an Oracle Apps DBA and SQL Server Developer with 4+ years of hands-on
                experience in enterprise environments.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                I specialize in Oracle EBS Administration, SQL Server Database Administration,
                Performance Tuning, Backup & Recovery, Automation, Power BI, and Python Django
                development — keeping critical systems fast, secure, and always available.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid gap-5"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                variants={slideInRight}
                whileHover={{
                  scale: 1.03,
                  x: 8,
                  rotateY: 3,
                  transition: { type: "spring", stiffness: 300 },
                }}
                style={{ transformPerspective: 800 }}
                className="glass-card rounded-2xl p-6 flex items-center gap-5 cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center border border-orange-500/20"
                >
                  <item.icon className="text-orange-400" size={26} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
