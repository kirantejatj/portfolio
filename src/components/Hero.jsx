function Hero() {
  return (
    <section
  id="home"
  className="min-h-screen bg-black text-white flex items-center justify-center"
>
      <div className="text-center px-6">

        <p className="text-cyan-400 text-xl mb-3">
          👋 Hello, I'm
        </p>

        <h1 className="text-6xl md:text-7xl font-bold text-cyan-400">
          KOTAGIRI KIRAN TEJA
        </h1>

        <div className="mt-6 space-y-2 text-2xl">
          <p>Oracle Apps DBA</p>
          <p>SQL Server DBA</p>
          <p>Python Django Developer</p>
        </div>

        <p className="mt-6 text-gray-400">
          4+ Years of Experience in Enterprise Database Administration
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold">
            Download Resume
          </button>

          <button className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-6 py-3 rounded-lg font-semibold">
            Contact Me
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;