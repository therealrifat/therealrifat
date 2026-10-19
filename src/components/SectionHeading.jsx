import Reveal from "./Reveal.jsx";

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
      {subtitle && <p className="mt-5 text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}

export default SectionHeading;
