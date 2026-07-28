import React from "react";
import { ShieldAlert } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../lib/projects";

export default function Projects() {
    return (
        <section id="projects" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">

            {/* HUD Header Bar */}
            <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
                <span className="text-neon-lime font-mono">[04]</span>
                <span className="tracking-widest font-semibold uppercase">PROJECT_LOGS</span>
                <div className="flex-grow h-[1px] bg-neon-lime/10"></div>
                <span className="text-[10px] text-neon-lime/40 uppercase">DATA_REPORTS</span>
            </div>

            <div className="flex flex-col gap-8">

                {/* Title block with hacker details */}
                <div className="flex flex-col gap-1.5 border-b border-white/5 pb-6">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
                        Project Logs
                    </h3>
              <span lang="ja" className="font-mono text-sm font-bold text-neon-lime/80">制作記録</span>
                    <p className="text-sm font-mono text-gray-400 uppercase">
                        [SYS_RECORDING] Verified builds, case studies, and deployed interface work.
                    </p>
                </div>

                {/* Project Card Responsive Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>

                {/* Dynamic warning system stats bottom disclaimer */}
                <div className="border border-white/5 bg-black/40 p-4 rounded-sm flex items-start gap-3.5 mt-2">
                    <div className="p-2 bg-neon-purple/10 border border-neon-purple/30 rounded-xs text-neon-purple">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col font-mono text-[10.5px] leading-relaxed text-gray-400">
                        <span className="text-white font-bold uppercase tracking-wider">
                            PROWLER DATA RECOVERY LOG
                        </span>
                        <span className="mt-0.5">
                            Project records may link to live deployments, case-study routes, testing environments, or private repository states.
                        </span>
                    </div>
                </div>

            </div>

        </section>
    );
}