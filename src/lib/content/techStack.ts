export type TechCategoryId = "ALL" | "CORE" | "FRAMEWORKS" | "STYLING" | "SCRIPTING" | "BACKEND" | "TOOLS";
export type TechStatus = "CORE" | "ACTIVE" | "LEARNING";

export interface TechCategory {
  id: TechCategoryId;
  label: string;
}

export interface TechItem {
  name: string;
  category: Exclude<TechCategoryId, "ALL">;
  status: TechStatus;
  level?: string;
  icon?: string;
}

export const techCategories: TechCategory[] = [
  { id: "ALL", label: "ALL_SYSTEMS" },
  { id: "CORE", label: "FRONTEND_CORE" },
  { id: "FRAMEWORKS", label: "FRAMEWORKS" },
  { id: "STYLING", label: "STYLING_AND_MOTION" },
  { id: "SCRIPTING", label: "SHELL_SCRIPTING" },
  { id: "BACKEND", label: "BACKEND_AND_DATA" },
  { id: "TOOLS", label: "DEVELOPMENT_TOOLS" },
];

export const techStack: TechItem[] = [
  { name: "HTML5", category: "CORE", status: "CORE" },
  { name: "CSS3", category: "CORE", status: "CORE" },
  { name: "JavaScript", category: "CORE", status: "CORE" },
  { name: "TypeScript", category: "CORE", status: "CORE" },
  { name: "React", category: "FRAMEWORKS", status: "CORE" },
  { name: "Next.js", category: "FRAMEWORKS", status: "ACTIVE" },
  { name: "Vue", category: "FRAMEWORKS", status: "ACTIVE" },
  { name: "Angular", category: "FRAMEWORKS", status: "LEARNING" },
  { name: "Nuxt", category: "FRAMEWORKS", status: "LEARNING" },
  { name: "Tailwind CSS", category: "STYLING", status: "CORE" },
  { name: "motion.dev", category: "STYLING", status: "ACTIVE" },
  { name: "Vite", category: "STYLING", status: "ACTIVE" },
  { name: "Node.js", category: "BACKEND", status: "LEARNING" },
  { name: "Python", category: "BACKEND", status: "LEARNING" },
  { name: "Django", category: "BACKEND", status: "LEARNING" },
  { name: "SQL", category: "BACKEND", status: "ACTIVE" },
  { name: "Supabase", category: "BACKEND", status: "LEARNING" },
  { name: "Bash Scripting", category: "SCRIPTING", status: "LEARNING" },
  { name: "Git", category: "TOOLS", status: "CORE" },
  { name: "GitHub", category: "TOOLS", status: "CORE" },
  { name: "Figma", category: "TOOLS", status: "LEARNING" },
];
