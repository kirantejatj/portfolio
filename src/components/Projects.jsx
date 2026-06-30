import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, FolderKanban, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer, springHover } from "../utils/motionVariants";

const projects = [
  {
    title: "AP Nirman",
    description:
      "Government project for Andhra Pradesh using Oracle Database, Oracle EBS and PL/SQL for large-scale infrastructure management.",
    tags: ["Oracle", "PL/SQL", "Linux"],
    gradient: "from-orange-500 via-amber-500 to-orange-600",
  },
  {
    title: "Database Administration",
    description:
      "SQL Server production support, performance tuning, backup & recovery, automation and monitoring for enterprise workloads.",
    tags: ["SQL Server", "PowerShell", "SSIS"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
  },
];

function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 bg-[#050506] overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <span className="section-label justify-center">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-10"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              custom={i}
              whileHover={springHover}
              style={{ transformPerspective: 1000 }}
              className="group relative gloss-border cursor-default"
            >
              <div className="gloss-border-inner overflow-hidden">
                <motion.div
                  className={`h-1.5 bg-gradient-to-r ${project.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                  style={{ transformOrigin: "left" }}
                />

                <div className="p-8 md:p-10 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all duration-500" />

                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center border border-orange-500/25"
                    >
                      <FolderKanban className="text-orange-400" size={26} />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      className="text-zinc-600 group-hover:text-orange-400 transition-colors"
                    >
                      <ArrowUpRight size={22} />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.2 + ti * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-1.5 text-xs font-semibold rounded-full glass-card text-orange-400"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
