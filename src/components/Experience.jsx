import portfolio from "../data/portfolio.json";
import SectionHeading from "./SectionHeading.jsx";
import Timeline from "./Timeline.jsx";

function Experience() {
  const { experience } = portfolio;

  // Requirement says "if applicable" — hide the whole section when empty.
  if (!experience?.length) return null;

  return (
    <section
      id="experience"
      className="border-t border-white/5 bg-slate-900/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="My professional journey and the teams I've contributed to."
        />
        <Timeline
          items={experience}
          itemKey={(item) => `${item.company}-${item.role}`}
          accentIcon="briefcase"
        />
      </div>
    </section>
  );
}

export default Experience;
