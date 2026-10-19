import { useEffect, useState } from "react";
import portfolio from "../data/portfolio.json";

const { profile, experience } = portfolio;

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  // Only show the Experience tab when there is experience data
  ...(experience?.length ? [{ id: "experience", label: "Experience" }] : []),
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const firstName = profile.name.split(" ")[0];
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Navbar background on scroll + reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 8);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id));
    if (sections.every((s) => s === null)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.filter(Boolean).forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while mobile menu is open, close on Escape
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-slate-950/80 backdrop-blur-xl"
          : "border-transparent bg-slate-950/40 backdrop-blur-md"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            {initials}
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            {firstName}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              .dev
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-2 h-px bg-gradient-to-r from-indigo-400 to-cyan-400" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: resume CTA + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:scale-105 hover:shadow-indigo-500/40 sm:inline-flex"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Resume
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 border-t border-white/5 px-4 pb-2 pt-3 sm:px-6">
          {NAV_LINKS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/5 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-4 w-0.5 rounded-full transition-colors ${
                      active
                        ? "bg-gradient-to-b from-indigo-400 to-cyan-400"
                        : "bg-transparent"
                    }`}
                  />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="px-4 pb-5 pt-2 sm:px-6">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 sm:hidden"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="h-0.5 w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}

export default Navbar;
