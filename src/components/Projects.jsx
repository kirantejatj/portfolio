function Projects() {
  return (
    <section
      id="projects"
      className="bg-slate-900 text-white py-20 px-10"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-cyan-400 mb-12 text-center">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-black rounded-xl p-6 border border-cyan-500 hover:scale-105 transition">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              AP Nirman
            </h3>

            <p className="text-gray-300 mb-4">
              Government project for Andhra Pradesh using Oracle Database,
              Oracle EBS and PL/SQL.
            </p>

            <p className="text-cyan-400">
              Oracle • PL/SQL • Linux
            </p>

          </div>

          <div className="bg-black rounded-xl p-6 border border-cyan-500 hover:scale-105 transition">

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Database Administration
            </h3>

            <p className="text-gray-300 mb-4">
              SQL Server production support, performance tuning,
              backup & recovery, automation and monitoring.
            </p>

            <p className="text-cyan-400">
              SQL Server • PowerShell • SSIS
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Projects;