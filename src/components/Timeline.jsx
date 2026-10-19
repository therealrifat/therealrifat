import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";

/**
 * Shared vertical timeline used by both Education and Experience.
 * items: [{ role/degree, org/institution, period, description, highlights }]
 */
function Timeline({ items, itemKey, accentIcon }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-indigo-500/60 via-cyan-400/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <Reveal key={itemKey(item)} delay={index * 150}>
            <div
              className={`relative pl-12 sm:pl-0 ${
                index % 2 === 0 ? "sm:pr-[calc(50%+2rem)]" : "sm:pl-[calc(50%+2rem)]"
              }`}
            >
              {/* Dot */}
              <span className="absolute left-4 top-1.5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-cyan-400 sm:left-1/2">
                <Icon name={accentIcon} className="h-4 w-4" />
              </span>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/5">
                <span className="inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                  {item.period}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.role ?? item.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-cyan-400">
                  {item.company ?? item.institution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
                {item.highlights?.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
