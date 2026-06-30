import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.button
          onClick={() => scrollToSection("home")}
          className="relative group"
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl font-bold gradient-text">KT</span>
          <motion.span
            className="absolute -inset-2 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors -z-10"
            layoutId="logo-glow"
          />
        </motion.button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                activeSection === link.id
                  ? "text-orange-400"
                  : "text-zinc-400 hover:text-orange-300"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-orange-500/10 border border-orange-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("contact")}
            className="ml-3 relative px-5 py-2.5 text-sm font-semibold rounded-full btn-glossy text-white"
          >
            Hire Me
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.9, rotate: 90 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-orange-400 rounded-xl glass-card"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden nav-glass"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="px-6 py-4 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-3 text-zinc-300 hover:text-orange-400 glass-card rounded-xl transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
