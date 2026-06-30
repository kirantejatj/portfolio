import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Terminal, BarChart3 } from "lucide-react";
import FloatingOrbs from "./FloatingOrbs";
import { fadeUp, staggerContainer, springHover, tapSpring } from "../utils/motionVariants";

const skillGroups = [
  {
    icon: Database,
    title: "Database",
    skills: [
      { name: "Oracle 11g / 12c / 19c", level: 95 },
      { name: "SQL Server 2012 – 2019", level: 90 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 70 },
    ],
  },
  {
    icon: Terminal,
    title: "Development",
    skills: [
      { name: "Python", level: 85 },
      { name: "Django", level: 80 },
      { name: "React", level: 75 },
      { name: "PL/SQL", level: 90 },
    ],
  },
  {
    icon: BarChart3,
    title: "Tools & BI",
    skills: [
      { name: "Power BI", level: 80 },
      { name: "PowerShell", level: 85 },
      { name: "SSIS", level: 78 },
      { name: "Linux", level: 82 },
    ],
  },
];

function SkillBar({ level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="skill-bar mt-2">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 mesh-bg overflow-hidden">
      <FloatingOrbs />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <span className="section-label justify-center">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              custom={gi}
              whileHover={springHover}
              whileTap={tapSpring}
              style={{ transformPerspective: 1000 }}
              className="group glass-card rounded-3xl p-8 cursor-default"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: gi * 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/25 to-amber-500/10 flex items-center justify-center mb-7 border border-orange-500/20 shadow-lg shadow-orange-500/10"
              >
                <group.icon className="text-orange-400" size={30} />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-6">{group.title}</h3>

              <ul className="space-y-5">
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + gi * 0.15 + si * 0.08 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">{skill.name}</span>
                      <span className="text-orange-400 text-xs font-bold">{skill.level}%</span>
                    </div>
                    <SkillBar level={skill.level} delay={0.4 + gi * 0.1 + si * 0.08} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
