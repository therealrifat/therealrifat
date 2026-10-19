import portfolio from "../data/portfolio.json";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";

const { contact, profile, socials } = portfolio;

function ContactCard({ icon, label, value, href }) {
  return (
    <Reveal>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/5"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition duration-300 group-hover:scale-110">
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-sm text-slate-400">{label}</span>
        <span className="break-all font-semibold text-white">{value}</span>
      </a>
    </Reveal>
  );
}

function Contact() {
  const whatsappNumber = contact.whatsapp

  return (
    <section
      id="contact"
      className="border-t border-white/5 bg-slate-900/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={contact.headline}
          subtitle={contact.message}
        />

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon="mail"
            label="Email"
            value={contact.email}
            href={`mailto:${contact.email}`}
          />
          <ContactCard
            icon="phone"
            label="Phone"
            value={contact.phone}
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
          />
          <ContactCard
            icon="whatsapp"
            label="WhatsApp"
            value={contact.whatsapp}
            href={`https://wa.me/${whatsappNumber}`}
          />
        </div>

        {/* Social links row */}
        <Reveal delay={200}>
          <div className="mt-12 flex items-center justify-center gap-3">
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

        {/* Resume CTA */}
        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:scale-105 hover:shadow-indigo-500/40"
            >
              <Icon name="download" className="h-4 w-4" />
              Download My Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
