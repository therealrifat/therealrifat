import { useEffect, useState } from "react";
import portfolio from "../data/portfolio.json";
import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";

const { profile, socials } = portfolio;

/** Typewriter effect for the rotating designation under the name. */
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) setDeleting(true);
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      deleting ? 45 : 95,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

function Hero() {
  const typed = useTypewriter(profile.roles ?? [profile.role]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-16"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* Left: intro text */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                {profile.name}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="mt-3 text-xl font-semibold text-slate-300 sm:text-2xl">
              {typed}
              <span className="ml-0.5 inline-block h-[1.1em] w-[3px] translate-y-[3px] animate-pulse bg-cyan-400" />
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
              {profile.tagline}
            </p>
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:scale-105 hover:shadow-indigo-500/40"
              >
                <Icon name="download" className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-cyan-400/50 hover:bg-white/10"
              >
                View My Work
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Social links */}
          <Reveal delay={500}>
            <div className="mt-10 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:text-white"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: photo */}
        <Reveal delay={300} className="justify-self-center lg:justify-self-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500/40 via-transparent to-cyan-400/40 blur-2xl" />
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative h-72 w-72 rounded-full border border-white/10 object-cover shadow-2xl sm:h-96 sm:w-96"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute -bottom-2 -left-6 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-10">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icon name="code" className="h-4 w-4 text-cyan-400" />
                {profile.role}
              </p>
            </div>
            <div className="absolute -right-2 top-6 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur sm:-right-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icon name="mapPin" className="h-4 w-4 text-indigo-400" />
                {profile.location}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
