import portfolio from "../data/portfolio.json";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";
import useInView from "../hooks/useInView.js";

const CATEGORY_ACCENTS = {
  Frontend: "from-indigo-500 to-cyan-400",
  Backend: "from-emerald-500 to-teal-400",
  "Tools & Others": "from-amber-500 to-orange-400",
};

function SkillBar({ name, level, delay, animate }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-300">{name}</span>
        <span className="text-slate-500">{level}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          style={{
            width: animate ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-1000 ease-out"
        />
      </div>
    </div>
  );
}

function Skills() {
  const { skills } = portfolio;
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section
      id="skills"
      className="border-t border-white/5 bg-slate-900/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Skills"
          title="Technologies I work with"
          subtitle="A snapshot of the tools and technologies I use to bring ideas to life."
        />

        <div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 150}>
              <div className="h-full rounded-2xl border border-white/10 bg-slate-950/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/5">
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${
                      CATEGORY_ACCENTS[group.category] ??
                      "from-indigo-500 to-cyan-400"
                    } text-white shadow-lg`}
                  >
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {group.category}
                  </h3>
                </div>
                <div className="space-y-5">
                  {group.items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={i * 120 + groupIndex * 200}
                      animate={inView}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
