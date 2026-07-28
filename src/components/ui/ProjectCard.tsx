import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, FolderClosed, ExternalLink } from "lucide-react";
import { Project } from "../../lib/projects";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const statusColors = {
        COMPLETE: "bg-neon-green/10 text-neon-green border-neon-green/30",
        PROTOTYPE: "bg-neon-blue/10 text-neon-blue border-neon-blue/30",
        ACTIVE_DEV: "bg-neon-purple/10 text-neon-purple border-neon-purple/30",
    };

    return (
        <div
            className="border border-white/5 bg-black/60 backdrop-blur-sm rounded-sm p-5 flex flex-col justify-between h-auto hover:border-neon-lime/40 hover:bg-black/80 transition-all duration-300 group shadow-md hover:shadow-glow-lime/5 cursor-default relative overflow-hidden transform hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:translate-y-0"
        >
            {/* Decorative vertical line accent in the background */}
            <div className="absolute top-0 right-0 w-[2px] h-0 bg-neon-lime group-hover:h-full transition-all duration-500"></div>

            <div>
                {/* Card Header stats-bar */}
                <div className="flex justify-between items-center text-[11px] font-mono text-gray-300 border-b border-white/5 pb-3 mb-4 select-none">
                    <span className="flex items-center gap-1.5 uppercase font-mono tracking-wider">
                        <FolderClosed className="w-3.5 h-3.5 text-neon-lime" />
                        {project.type}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-300 font-mono">{`// ${project.year}`}</span>
                        {project.currentVersion && (
                            <span className="text-[11px] font-black tracking-widest px-1.5 py-0.5 rounded-xs border border-neon-blue/20 bg-neon-blue/5 text-neon-blue uppercase">
                                {`VERSION: ${project.currentVersion}`}
                            </span>
                        )}
                        <span className={`text-[11px] font-black tracking-widest px-1.5 py-0.5 rounded-xs border uppercase ${statusColors[project.status]}`}>
                            {project.status === "ACTIVE_DEV" ? "ACTIVE" : project.status}
                        </span>
                    </div>
                </div>

                {/* Project Title */}
                <h4 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-neon-lime transition-all duration-300 uppercase font-sans">
                    {project.title}
                </h4>

                {/* Project Short Description */}
                <p className="text-gray-200 text-sm leading-relaxed mt-2.5 font-sans">
                    {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.stack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="text-[11px] font-mono font-semibold tracking-wider text-neon-blue bg-neon-blue/5 border border-neon-blue/10 px-2 py-0.5 rounded-sm"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.stack.length > 4 && (
                        <span className="text-[11px] font-mono text-gray-300 px-1 py-0.5">
                            +{project.stack.length - 4} MORE
                        </span>
                    )}
                </div>
            </div>

            {/* Footer Interface Actions */}
            <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center gap-4">
                {/* Core Case Study Router Action */}
                <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-mono font-bold text-neon-lime hover:text-white flex items-center gap-1 group/btn transition-colors duration-200 cursor-pointer"
                >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neon-lime group-hover/btn:text-white transition-colors duration-200" />
                </Link>

                {/* Outer Links (Optional) */}
                <div className="flex items-center gap-3">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noreferrer"
                            title="View Repository On GitHub"
                            className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noreferrer"
                            title="Launch Application Node"
                            className="text-gray-300 hover:text-neon-green transition-colors duration-200"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
