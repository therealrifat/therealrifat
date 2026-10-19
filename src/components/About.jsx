import portfolio from "../data/portfolio.json";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const { profile, about } = portfolio;

function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Get to know me"
          subtitle="A little bit about who I am, how I got here, and what I enjoy."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Photo card */}
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-indigo-500/30 via-transparent to-cyan-400/30 blur-xl" />
              <img
                src={profile.photo}
                alt={profile.name}
                className="relative w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "3+", label: "Projects" },
                  { value: "1+", label: "Years Learning" },
                  { value: "100%", label: "Passion" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={150}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">My Journey</h3>
                <p className="mt-3 leading-relaxed text-slate-400">
                  {about.journey}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">
                  What I Enjoy Doing
                </h3>
                <p className="mt-3 leading-relaxed text-slate-400">
                  {about.whatIDo}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Beyond the Code
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {about.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
