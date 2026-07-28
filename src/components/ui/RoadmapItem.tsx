import React from "react";
import { CheckCircle2, CircleDot, Clock3, Radio } from "lucide-react";
import { getRoadmapUptime, getRoadmapDuration, type RoadmapItem as RoadmapItemType, type RoadmapStatus } from "../../lib/roadmap";

interface RoadmapItemProps {
  item: RoadmapItemType;
  index: number;
}

const statusStyles: Record<RoadmapStatus, string> = {
  COMPLETED: "border-neon-green/25 bg-neon-green/5 text-neon-green",
  ACTIVE: "border-neon-lime/25 bg-neon-lime/5 text-neon-lime",
  QUEUED: "border-neon-blue/25 bg-neon-blue/5 text-neon-blue",
  UPGRADING: "border-neon-purple/25 bg-neon-purple/5 text-neon-purple",
};

const statusIcons = {
  COMPLETED: CheckCircle2,
  ACTIVE: Radio,
  QUEUED: Clock3,
  UPGRADING: CircleDot,
};

export default function RoadmapItem({ item, index }: RoadmapItemProps) {
  const StatusIcon = statusIcons[item.status];
  const shouldShowUptime = item.showUptime ?? item.status === "ACTIVE";
  const shouldShowDuration = item.showDuration ?? item.status === "COMPLETED";
  const uptime = shouldShowUptime ? getRoadmapUptime(item.startDate) : null;
  const duration = shouldShowDuration ? getRoadmapDuration(item.startDate, item.endDate) : null;

  return (
    <article className="relative border border-white/5 bg-[#08090d]/75 p-5 rounded-sm transition-all duration-300 hover:border-neon-lime/20 hover:bg-black/70">
      <div className="absolute left-[-1.15rem] top-6 hidden h-3 w-3 rounded-full border border-neon-lime/40 bg-obsidian shadow-[0_0_10px_rgba(197,255,0,0.18)] md:block" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-gray-300">
              {`// ${String(index + 1).padStart(2, "0")} ${item.phase}`}
            </span>
            <h4 className="font-sans text-lg font-black uppercase tracking-tight text-white">
              {item.title}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase">
            <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-black tracking-wider ${statusStyles[item.status]}`}>
              <StatusIcon className="h-3 w-3" aria-hidden="true" />
              {item.status}
            </span>
            {duration !== null && (
              <span className="rounded-sm border border-neon-green/15 bg-neon-green/5 px-2 py-1 font-black tracking-wider text-neon-green">
                {`DURATION: ${duration}D`}
              </span>
            )}
            {uptime !== null && (
              <span className="rounded-sm border border-neon-purple/15 bg-neon-purple/5 px-2 py-1 font-black tracking-wider text-neon-purple">
                {`UPTIME: ${uptime}D`}
              </span>
            )}
            <span className="rounded-sm border border-white/10 bg-black/40 px-2 py-1 text-gray-300">
              {item.period}
            </span>
          </div>
        </div>

        {item.description && (
          <p className="border-l border-neon-lime/15 pl-3 text-sm leading-relaxed text-gray-300">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-sm border border-white/5 bg-white/3 px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}