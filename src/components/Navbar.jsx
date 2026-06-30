function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-cyan-500/20">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}

        <h1
          onClick={() => scrollToSection("home")}
          className="text-3xl font-bold text-cyan-400 cursor-pointer"
        >
          KT
        </h1>

        {/* Menu */}

        <div className="flex gap-8 text-white font-medium">

          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-cyan-400 transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-cyan-400 transition"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("skills")}
            className="hover:text-cyan-400 transition"
          >
            Skills
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="hover:text-cyan-400 transition"
          >
            Projects
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-cyan-400 transition"
          >
            Contact
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;