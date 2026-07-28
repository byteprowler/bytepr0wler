export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  category: string;
  status: "VERIFIED" | "COMPLETED" | "PENDING";
  credentialUrl?: string;
  certificateFile?: string;
  certificateImage?: string;
  description?: string;
  skills: string[];
}


// Place real certificate files in public/certificates/.
// Example file path: public/certificates/apprenticeship-certificate.pdf
// Public URL in data: /certificates/apprenticeship-certificate.pdf
export const certifications: Certification[] = [
  {
    id: "CERT-081-PRWLR",
    title: "Frontend Web Developer",
    issuer: "Univelcity",
    issuedAt: "2024",
    category: "FRONTEND",
    status: "COMPLETED",
    certificateFile: "/pdf/frontend_certificate_by_univelcity.pdf",
    certificateImage: "/webp/frontend_certificate_by_univelcity.webp",
    description: "In-depth specialization covering React Server Components, hydration protocols, low-overhead state routing pipelines, and static generation caching dynamics.",
    skills: ["React Server Components", "Next.js App Router", "Dynamic Caching", "SSR Engines"]
  },
  // {
  //   id: "CERT-081-PRWLR",
  //   title: "Advanced React & Next.js Architecture",
  //   issuer: "Vercel Academic Initiative (Simulation)",
  //   issuedAt: "2025",
  //   category: "FRONTEND",
  //   status: "VERIFIED",
  //   credentialUrl: "https://nextjs.org",
  //   description: "In-depth specialization covering React Server Components, hydration protocols, low-overhead state routing pipelines, and static generation caching dynamics.",
  //   skills: ["React Server Components", "Next.js Pages Router", "Dynamic Caching", "SSR Engines"]
  // },
  {
    id: "CERT-092-PRWLR",
    title: "Junior Frontend Engineer",
    issuer: "MentorLed",
    issuedAt: "2025",
    category: "FRONTEND",
    status: "COMPLETED",
    certificateFile: "/pdf/junior_frontend_mentorled.pdf",
    certificateImage: "/webp/junior_frontend_mentorled.webp",
    description: "Certification in layouts, semantic accessibility models, touch-target thresholds, fluid layouts, and cross-browser screen compatibility ratios.",
    skills: ["HTML5 Semantic Node", "CSS Grid & Flexbox", "WAI-ARIA Guidelines", "Responsive Viewports"]
  },
  // {
  //   id: "CERT-092-PRWLR",
  //   title: "Responsive Web Engineering & UI Standards",
  //   issuer: "W3C Developer Guild (Simulation)",
  //   issuedAt: "2024",
  //   category: "FRONTEND",
  //   status: "VERIFIED",
  //   credentialUrl: "https://www.w3.org",
  //   description: "Certification in layouts, semantic accessibility models, touch-target thresholds, fluid layouts, and cross-browser screen compatibility ratios.",
  //   skills: ["HTML5 Semantic Node", "CSS Grid & Flexbox", "WAI-ARIA Guidelines", "Responsive Viewports"]
  // },
  {
    id: "CERT-103-PRWLR",
    title: "Backend Web Developer",
    issuer: "Univelcity",
    issuedAt: "2024",
    category: "BACKEND",
    status: "VERIFIED",
    certificateFile: "/pdf/backend_certificate_by_univelcity.pdf",
    certificateImage: "/webp/backend_certificate_by_univelcity.webp",
    description: "Covers SQL transactions, table modeling index policies, row-level safety rules with server auth setups, and low-latency API proxy routes.",
    skills: ["SQL Data Modeling", "Supabase Row Safety", "API Design", "PostgreSQL Indexes"]
  },
  // {
  //   id: "CERT-103-PRWLR",
  //   title: "Full-Stack System Fundamentals & SQL Engines",
  //   issuer: "Prisma Systems Coalition (Simulation)",
  //   issuedAt: "2025",
  //   category: "BACKEND",
  //   status: "VERIFIED",
  //   credentialUrl: "https://supabase.com",
  //   description: "Covers SQL transactions, table modeling index policies, row-level safety rules with server auth setups, and low-latency API proxy routes.",
  //   skills: ["SQL Data Modeling", "Supabase Row Safety", "API Design", "PostgreSQL Indexes"]
  // },
  // {
  //   id: "CERT-114-PRWLR",
  //   title: "Unified Git Version Control & Deployment Pipelines",
  //   issuer: "GitHub Operations Academy (Simulation)",
  //   issuedAt: "2024",
  //   category: "TOOLS",
  //   status: "VERIFIED",
  //   credentialUrl: "https://github.com",
  //   description: "Advanced branching control practices, conflict resolution strategies, production build integrations, and docker continuous delivery web integrations.",
  //   skills: ["Git Core Workflows", "CI/CD Actions", "Docker Containers", "Build Audits"]
  // },
  // {
  //   id: "CERT-125-PRWLR",
  //   title: "Modern Python & Framework Microservices",
  //   issuer: "Python Foundation Sector (Simulation)",
  //   issuedAt: "2025",
  //   category: "BACKEND",
  //   status: "PENDING",
  //   description: "Study of Python language fundamentals, Django and FastAPI backends, asynchronous query listeners, and data extraction pipelines.",
  //   skills: ["Django REST Web", "Asynchronous Python", "Data Structuring", "Microservices"]
  // }
];
