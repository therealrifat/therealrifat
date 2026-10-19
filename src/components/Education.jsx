import portfolio from "../data/portfolio.json";
import SectionHeading from "./SectionHeading.jsx";
import Timeline from "./Timeline.jsx";

function Education() {
  return (
    <section id="education" className="border-t border-white/5 bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education"
          title="My academic background"
          subtitle="Where I've studied and what I've learned along the way."
        />
        <Timeline
          items={portfolio.education}
          itemKey={(item) => item.degree}
          accentIcon="graduationCap"
        />
      </div>
    </section>
  );
}

export default Education;
