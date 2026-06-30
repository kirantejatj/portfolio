import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Link2, Send } from "lucide-react";
import FloatingOrbs from "./FloatingOrbs";
import { fadeUp, staggerContainer, springHover, tapSpring } from "../utils/motionVariants";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "kotagirikiranteja@gmail.com",
    href: "mailto:kotagirikiranteja@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7337229232",
    href: "tel:+917337229232",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "kiran-teja-26ba3b258",
    href: "https://linkedin.com/in/kiran-teja-26ba3b258",
  },
];

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 mesh-bg overflow-hidden">
      <FloatingOrbs />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <span className="section-label justify-center">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-5">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto text-lg">
            Open to new opportunities and collaborations. Reach out anytime.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid sm:grid-cols-3 gap-5 mb-14"
        >
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label === "LinkedIn" ? "_blank" : undefined}
              rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              custom={i}
              whileHover={springHover}
              whileTap={tapSpring}
              className="glass-card rounded-2xl p-7 text-center group block"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-orange-500/25 to-amber-500/10 flex items-center justify-center border border-orange-500/20 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-shadow"
              >
                <item.icon className="text-orange-400" size={24} />
              </motion.div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">
                {item.label}
              </p>
              <p className="text-sm text-zinc-400 group-hover:text-white transition-colors break-all">
                {item.value}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="gloss-border"
        >
          <div className="gloss-border-inner p-10 md:p-14 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Send className="mx-auto text-orange-400 mb-6" size={36} />
            </motion.div>
            <p className="text-2xl text-zinc-200 mb-3 font-semibold">
              Ready to discuss your next project?
            </p>
            <p className="text-zinc-500 mb-8">
              I typically respond within 24 hours.
            </p>
            <motion.a
              href="mailto:kotagirikiranteja@gmail.com"
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full btn-glossy text-white font-semibold relative z-10"
            >
              <Mail size={18} />
              Send an Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
