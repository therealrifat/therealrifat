# AGENTS.md

## Project

Personal portfolio SPA: React 19 + Vite 8 + Tailwind CSS v4. Plain JSX (no TypeScript, no router, no state library) — a single page where project details open in a modal overlay.

## Commands

- Dev server: `npm.cmd run dev`
- Verify (both must pass): `npm.cmd run lint` then `npm.cmd run build`
- **Use `npm.cmd`, not `npm`** — PowerShell execution policy blocks `npm.ps1` on this machine. No tests or typecheck exist.

## Content is data-driven

All editable content lives in `src/data/portfolio.json` (profile, socials, about, skills, education, experience, projects, contact). Change content there, not in components — components just import and render it.

- Typewriter hero text cycles `profile.roles`.
- `experience: []` hides the entire Experience section **and** its navbar tab — the tab is added conditionally in `Navbar.jsx`, so adding entries back restores both automatically.
- `profile.resume` / `profile.photo` point to `/resume.pdf` / `/photo.jpg` in `public/`.

## Conventions & gotchas

- **Tailwind v4**: there is no `tailwind.config.js` — styling is `@import "tailwindcss"` in `src/index.css` plus utility classes. Custom keyframes/utilities (`.animate-gradient`, `.modal-enter`, smooth scroll, `scroll-margin-top` for anchors) live in `index.css`.
- **Section IDs must match `NAV_LINKS`** in `src/components/Navbar.jsx`: home, about, skills, education, projects, contact — plus `experience`, which is included only when `portfolio.experience` has entries. Adding a non-conditional section = a `<section id="...">` plus a `NAV_LINKS` entry.
- **react-hooks lint is strict**: writing a ref during render (e.g. `optionsRef.current = x`) is an error. Destructure primitives into `useEffect` deps instead — see `src/hooks/useInView.js`.
- **Placeholder assets are intentional**: `public/resume.pdf`, `public/photo.jpg`, and `public/projects/*.jpg` don't exist yet. `ProjectImage.jsx` falls back to a gradient placeholder; hero/about images hide on error. Don't "fix" the 404s — real files get dropped in later. If adding a new icon, extend `src/components/Icon.jsx` (inline SVGs; no icon library is installed — don't add one unprompted).

## src/ layout

- `components/` — one component per section (Hero, About, Skills, Education, Experience, Projects, Contact, Footer) + Navbar, plus shared: `Reveal`, `Icon`, `SectionHeading`, `Timeline`, `ProjectImage`, `ProjectModal`.
- `hooks/useInView.js` — IntersectionObserver hook that fires once and stays true (drives scroll reveals and skill-bar animation).
- `data/portfolio.json` — single source of content.
