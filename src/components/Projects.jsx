import { useState } from "react";
import portfolio from "../data/portfolio.json";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";
import ProjectImage from "./ProjectImage.jsx";
import ProjectModal from "./ProjectModal.jsx";

const { projects } = portfolio;

function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="border-t border-white/5 bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          subtitle="A selection of my best work — click 'View Details' to learn more about each one."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 150}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="relative h-48 overflow-hidden">
                  <ProjectImage
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {project.shortDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 group-hover:border-cyan-400/50 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-cyan-500"
                  >
                    View More / Details
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

export default Projects;
