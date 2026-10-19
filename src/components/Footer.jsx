import portfolio from "../data/portfolio.json";
import Icon from "./Icon.jsx";

const { profile, socials } = portfolio;
const year = new Date().getFullYear();

function Footer() {
  const firstName = profile.name.split(" ")[0];

  return (
    <footer className="border-t border-white/5 bg-slate-950 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Back to top */}
        <a
          href="#home"
          aria-label="Back to top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:text-white"
        >
          <Icon name="arrowUp" className="h-5 w-5" />
        </a>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:text-white"
            >
              <Icon name={social.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500">
          © {year}{" "}
          <span className="font-semibold text-slate-300">
            {firstName}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              .dev
            </span>
          </span>{" "}
          — Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

export default Footer;
