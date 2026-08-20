import { profile } from "./profile";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  businessName: string;
  footerText: string;
  supportStatus: string;
  resumeUrl: string;
  anilistUsername?: string;
  lastfmUsername?: string;
  footerLinks: FooterLink[];
}

// Future idea: add a static Discord-style presence card or optional Lanyard-powered presence widget.
// Do not add real Discord RPC to the public portfolio without a clear need.
export const siteSettings: SiteSettings = {
  githubUrl: "https://github.com/byteprowler",
  linkedinUrl: "https://linkedin.com/in/ogo-joshua",
  email: "joshuaexcellency1@gmail.com",
  businessName: "ProwlerLabs Digital Solution",
  footerText: "BYTEPROWLER_SYSTEMS",
  supportStatus: "COMMENTED_OUT",
  resumeUrl: profile.resumeUrl,
  anilistUsername: process.env.NEXT_PUBLIC_ANILIST_USERNAME,
  lastfmUsername: process.env.LASTFM_USERNAME,
  footerLinks: [
    { label: "GITHUB", href: "https://github.com/byteprowler" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/ogo-joshua" },
    { label: "EMAIL", href: "mailto:joshuaexcellency1@gmail.com" },
    { label: "RESUME", href: profile.resumeUrl },
  ],
};