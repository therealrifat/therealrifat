import { useEffect } from "react";
import Icon from "./Icon.jsx";
import ProjectImage from "./ProjectImage.jsx";

function ProjectModal({ project, onClose }) {
  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="modal-enter my-8 w-full max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50">
          {/* Header image */}
          <div className="relative h-48 sm:h-60">
            <ProjectImage
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-slate-300 backdrop-blur transition hover:bg-slate-950 hover:text-white"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
            <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white sm:text-3xl">
              {project.name}
            </h3>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            {/* Tech stack */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Tech Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Description
              </h4>
              <p className="mt-3 leading-relaxed text-slate-300">
                {project.description}
              </p>
            </div>

            {/* Challenges */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Challenges Faced
              </h4>
              <ul className="mt-3 space-y-2">
                {project.challenges.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Future plans */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Future Improvements
              </h4>
              <ul className="mt-3 space-y-2">
                {project.futurePlans.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:scale-105"
              >
                <Icon name="externalLink" className="h-4 w-4" />
                Live Demo
              </a>
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                <Icon name="github" className="h-4 w-4" />
                Client Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
