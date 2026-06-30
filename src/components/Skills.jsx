function Skills() {
  return (
    <section
      id="skills"
      className="bg-black text-white py-20 px-10"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-cyan-400 mb-12 text-center">
          Technical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Database
            </h3>

            <ul className="space-y-2">
              <li>✔ Oracle 11g / 12c / 19c</li>
              <li>✔ SQL Server 2012 - 2019</li>
              <li>✔ PostgreSQL</li>
              <li>✔ MySQL</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Development
            </h3>

            <ul className="space-y-2">
              <li>✔ Python</li>
              <li>✔ Django</li>
              <li>✔ React</li>
              <li>✔ Power BI</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Skills;