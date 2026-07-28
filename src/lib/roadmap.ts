export type RoadmapPhase = "Previous Logs" | "Current Runtime" | "Next Protocol";
export type RoadmapStatus = "COMPLETED" | "ACTIVE" | "QUEUED" | "UPGRADING";

export type RoadmapItem = {
  id: string;
  phase: RoadmapPhase;
  title: string;
  period: string;
  status: RoadmapStatus;
  description: string;
  skills: string[];
  type: string;
  startDate?: string;
  endDate?: string;
  showUptime?: boolean;
  showDuration?: boolean;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getUtcDate(date?: string) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getDaysBetween(startDate?: string, endDate?: string) {
  const startedAt = getUtcDate(startDate);
  const endedAt = endDate ? getUtcDate(endDate) : new Date();

  if (!startedAt || !endedAt) {
    return null;
  }

  return Math.max(0, Math.floor((endedAt.getTime() - startedAt.getTime()) / MS_PER_DAY));
}

export function getRoadmapUptime(startDate?: string) {
  return getDaysBetween(startDate);
}

export function getRoadmapDuration(startDate?: string, endDate?: string) {
  if (!endDate) {
    return null;
  }

  return getDaysBetween(startDate, endDate);
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: "frontend-foundations",
    phase: "Previous Logs",
    title: "Frontend Foundation",
    period: "2024",
    status: "COMPLETED",
    type: "learning",
    startDate: "2024-01-01",
    endDate: "2024-05-31",
    showDuration: true,
    description:
      "Built core understanding of HTML, CSS, JavaScript, responsive layouts, and web interface structure.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive UI"],
  },
  {
    id: "react-next-growth",
    phase: "Previous Logs",
    title: "React and Next.js Growth",
    period: "2025",
    status: "COMPLETED",
    type: "learning",
    // startDate: "2025-01-01",
    // endDate: "2025-12-31",
    showDuration: true,
    description:
      "Worked with component-driven frontend development, routing, Tailwind CSS, Git/GitHub workflows, portfolio interfaces, dashboard patterns, and real project collaboration.",
    skills: ["React", "Next.js", "Tailwind CSS", "Git/GitHub"],
  },
  {
    id: "frontend-apprenticeship",
    phase: "Previous Logs",
    title: "Frontend Apprenticeship",
    period: "2025",
    status: "COMPLETED",
    type: "learning",
    startDate: "2025-06-19",
    endDate: "2025-11-21",
    showDuration: true,
    description:
      "Completed practical frontend training focused on collaborative builds, responsive interfaces, motion, accessibility, and component architecture.",
    skills: ["Next.js", "Framer Motion", "Tailwind CSS", "Responsive UI", "Frontend Architecture", "Accessibility"],
  },
  {
    id: "current-role",
    phase: "Previous Logs",
    title: "Frontend Developer Intern",
    period: "January 2026 - July 2026",
    status: "COMPLETED",
    type: "work",
    startDate: "2026-01-01",
    endDate: "2026-07-01",
    showDuration: true,
    description:
      "Worked on frontend interfaces, reusable components, responsive layouts, UI polish, and production-focused web experiences.",
    skills: [
      "React",
      "Vue.js",
      "Vite",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Responsive UI",
      "Frontend Architecture",
    ],
  },
  {
    id: "byteprowler-v2",
    phase: "Current Runtime",
    title: "Byteprowler v2 Revamp",
    period: "2026",
    status: "ACTIVE",
    type: "project",
    showUptime: false,
    description:
      "Revamping the portfolio into a hacker/terminal-inspired developer brand with stronger structure, project logs, certifications, roadmap, contact flow, SEO, and accessibility polish.",
    skills: ["Next.js", "Tailwind CSS", "Motion", "SEO", "Accessibility"],
  },
  {
    id: "fullstack-protocol",
    phase: "Current Runtime",
    title: "Fullstack Expansion",
    period: "June 2026 - Present",
    status: "ACTIVE",
    type: "growth",
    startDate: "2026-06-01",
    showUptime: true,
    description:
      "Expanding frontend architecture into backend systems, SQL, Supabase, APIs, authentication, testing, better system design, freelance/client projects, ProwlerLabs Digital Solution, and production-ready product development.",
    skills: ["Node.js", "Supabase", "SQL", "APIs", "Testing", "Bash Scripting"],
  },
];