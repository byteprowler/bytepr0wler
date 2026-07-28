import { profile } from "@/lib/profile";

const footerLinks = [
  { label: "GITHUB", href: "https://github.com/byteprowler" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/ogo-joshua" },
  { label: "EMAIL", href: "mailto:joshuaexcellency1@gmail.com" },
  { label: "RESUME", href: "/pdf/resume.pdf" },
];

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-5 border-t border-neon-lime/10 text-xs font-mono text-gray-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-neon-lime font-black tracking-widest uppercase">BYTEPROWLER</span>
          <span className="uppercase">
            {`Built by ${profile.realName} // ProwlerLabs Digital Solution`}
          </span>
          <span>{`\u00A9 ${new Date().getFullYear()} BYTEPROWLER_SYSTEMS`}</span>
          <span
            dir="rtl"
            aria-label="Blessed be YHWH"
            title="Blessed be YHWH"
            className="w-fit text-[12px]"
          >
            ברוך יהוה
          </span>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-2 sm:justify-end">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-sm border border-white/5 bg-white/3 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300 transition hover:border-neon-lime/25 hover:text-neon-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Place the real resume file at public/resume.pdf when ready. */}
    </footer>
  );
}
