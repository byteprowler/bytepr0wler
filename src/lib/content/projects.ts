export interface ProjectVersion {
  label: string;
  title: string;
  description: string;
  liveUrl?: string;
  status: string;
}

export type ProjectStatus = "COMPLETE" | "PROTOTYPE" | "ACTIVE_DEV";
export type RepoVisibility = "PUBLIC" | "PRIVATE" | "RESTRICTED";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  type: string;
  status: ProjectStatus;
  role: string;
  year: string;
  image?: string;
  coverImage?: string;
  ogImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  repoVisibility?: RepoVisibility;
  highlights: string[];
  currentVersion?: string;
  versions?: ProjectVersion[];
}

export const projects: Project[] = [
  {
    slug: "byteprowler-portfolio",
    title: "Byteprowler Portfolio",
    description: "Portfolio revamp showing the evolution from an initial personal site into the current Byteprowler hacker/terminal interface.",
    longDescription: "A personal portfolio rebuilt as a focused Byteprowler revamp using Next.js, Tailwind CSS, motion.dev, reusable sections, and server-side API routes for features like contact handling and view counting. The current version improves branding, personality, responsiveness, structure, accessibility, and the overall developer-story presentation without exposing client secrets.",
    stack: ["TypeScript", "React", "Tailwind CSS", "motion.dev", "Supabase"],
    type: "Portfolio Revamp",
    status: "ACTIVE_DEV",
    role: "Lead Architect",
    year: "2026",
    currentVersion: "v2",
    githubUrl: "https://github.com/byteprowler/bytepr0wler",
    liveUrl: "https://byteprowler.vercel.app",
    repoVisibility: "PRIVATE",
    highlights: [
      "Evolved from a basic personal portfolio into a branded Byteprowler revamp.",
      "Added terminal-inspired sections for projects, certifications, roadmap, anime feed, contact, and view count.",
      "Improved responsiveness, reusable component structure, accessibility details, and server-side handling for sensitive integrations.",
    ],
    versions: [
      {
        label: "v1",
        title: "Initial Portfolio",
        description: "A basic personal portfolio with earlier design and structure, created as the foundation for a public developer presence.",
        liveUrl: "https://byteprowler.netlify.com",
        status: "Archived",
      },
      {
        label: "v2",
        title: "Byteprowler Revamp",
        description: "The current hacker/terminal interface with improved branding, responsiveness, architecture, projects, certifications, roadmap, anime feed, contact flow, and view count.",
        liveUrl: "https://byteprowler.vercel.app",
        status: "Active",
      },
    ],
  },
  {
    slug: "giveroll",
    title: "Giveroll",
    description: "Giveaway platform MVP built around a wheel-based draw experience, with planned OBS livestream support to make winner selection more transparent and fair.",
    longDescription: "Giveroll is an unfinished giveaway platform concept focused on making online draws feel more transparent. The MVP centered on a wheel-based selection flow, with a broader plan to connect draw sessions to OBS-powered livestream workflows so audiences could watch results happen in real time. Development paused after the team reached the wheel MVP stage, so the project is presented as an honest prototype rather than a completed product.",
    stack: ["TypeScript", "React", "Tailwind CSS", "Next.js", "OBS Workflow"],
    type: "Giveaway Platform MVP",
    status: "PROTOTYPE",
    role: "Frontend Developer",
    year: "2026",
    repoVisibility: "PRIVATE",
    highlights: [
      "Built the core wheel-based giveaway draw interface for the MVP stage.",
      "Explored a livestream-first fairness model where OBS could broadcast draw sessions and winner selection.",
      "Kept the project scoped as a prototype after team momentum stopped before the full platform was completed.",
    ],
    versions: [
      {
        label: "mvp",
        title: "Wheel Draw MVP",
        description: "Initial build focused on the interactive giveaway wheel and draw flow before the larger livestream platform work paused.",
        status: "Paused Prototype",
      },
    ],
  },
  {
    slug: "quickgas-admin-portal",    title: "Quickgas Admin Portal",
    description: "High-performance fleet management console with real-time route tracing and delivery telemetry visualization.",
    longDescription: "A specialized fleet dashboard solution engineered to provide low-latency tracking of delivery trucks and secure transaction audit trails. Leverages responsive CSS meshes to render complex high-density tabular records beautifully on desktop and mobile viewports alike.",
    stack: ["React", "TypeScript", "Tailwind CSS", "D3.js", "Express", "PostgreSQL"],
    type: "Commercial SaaS",
    status: "PROTOTYPE",
    role: "Junior Frontend Engineer",
    year: "2025",
    githubUrl: "https://github.com/byteprowler/quickgas-portal",
    repoVisibility: "PRIVATE",
    highlights: [
      "Reduced render loop overhead during real-time map canvas route alterations by 42%.",
      "Seamless layout density management scaling custom spreadsheet boards from 1920px down to touch targets.",
      "Developed high-integrity transaction filter queries supporting rapid date range exports.",
    ],
  },
  {
    slug: "scholarswipe",
    title: "ScholarSwipe",
    description: "Educational match-maker connecting university students with qualified research grants and scholarships.",
    longDescription: "A swipe-optimized discovery engine designed for academic financing. Features localized local-storage persistence state controls to capture swipe telemetry, complete with detailed highlight overlays and accessible high-contrast navigation guides.",
    stack: ["React", "TypeScript", "Tailwind CSS", "motion.dev", "Figma"],
    type: "MVP Platform",
    status: "COMPLETE",
    role: "UI Designer & Developer",
    year: "2024",
    githubUrl: "https://github.com/byteprowler/scholarswipe",
    liveUrl: "https://scholarswipe.edu",
    repoVisibility: "PUBLIC",
    highlights: [
      "Pioneered responsive touch-canvas gestures with physics inertia fallback for standard browsers.",
      "Maintained full conformance to WAI-ARIA WCAG level AA accessibility standards for form nodes.",
      "Engineered automated client caching loops reducing server query fetches on match listings.",
    ],
  },
  {
    slug: "mently-ui-improvements",
    title: "Mently UI Refactor",
    description: "Professional design and interface optimization overhaul of the leading mental wellness scheduling web-app.",
    longDescription: "A focused interface modernization project targeting user retention, navigation clarity, and visual aesthetics of a digital wellness scheduling network. Rewrote legacy table matrices into reactive grids, streamlining user entry funnels.",
    stack: ["TypeScript", "React", "CSS Modules", "Vite", "Figma"],
    type: "Client Refactor",
    status: "COMPLETE",
    role: "Consultant Architect",
    year: "2024",
    repoVisibility: "PRIVATE",
    highlights: [
      "Increased user booking completion rates by 18% through simplified timezone visual selector rails.",
      "Architected clean custom-styled scheduling grid component with modular styling properties.",
      "Implemented responsive calendar drawers and slide-outs utilizing lightweight entrance transitions.",
    ],
  },
  {
    slug: "anime-discovery-interface",
    title: "Anime Discovery Hub",
    description: "Immersive media library viewer connecting directly to AniList's schema to explore top titles.",
    longDescription: "An immersive entertainment portal fetching live data from third-party GraphQL services. Handled complex list search terms, infinite pagination scroll listeners, and dynamic title cards supporting elegant visual previews.",
    stack: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "motion.dev"],
    type: "Web Application",
    status: "ACTIVE_DEV",
    role: "Front-End Lead",
    year: "2025",
    githubUrl: "https://github.com/byteprowler/anime-hub",
    repoVisibility: "PUBLIC",
    highlights: [
      "Designed dynamic card hover overlays styled with custom neon glowing borders.",
      "Engineered smart debounce query listeners on client input nodes preventing API rate threshold blocks.",
      "Optimized graphic payload delivery with reactive image loading states.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
