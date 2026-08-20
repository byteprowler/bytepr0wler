import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Headphones, Heart, MessageCircle, Radio, ShieldAlert, Signal, Tv } from "lucide-react";
import { fetchAniListActivity, type AniListActivityItem } from "../../lib/anilist";
import type { LastFmTrack } from "../../lib/lastfm";
import { siteSettings } from "../../lib/content/siteSettings";
import TrackCard from "../ui/TrackCard";

type SignalTab = "anilist" | "music";

interface LastFmRecentResponse {
  configured: boolean;
  tracks: LastFmTrack[];
  message?: "METHOD_NOT_ALLOWED" | "LASTFM_CONFIG_MISSING" | "LASTFM_SIGNAL_OFFLINE";
}

async function fetchRecentTracks() {
  const response = await fetch("/api/lastfm/recent");
  if (!response.ok) {
    throw new Error("LASTFM_API_ROUTE_OFFLINE");
  }
  return (await response.json()) as LastFmRecentResponse;
}

function formatActivityDate(createdAt: number) {
  if (!createdAt) return "RECENT";

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(createdAt * 1000));
  } catch {
    return "RECENT";
  }
}

function formatActivityAction(activity: AniListActivityItem) {
  return [activity.action, activity.progress].filter(Boolean).join(" ");
}

function AniListActivityCard({ activity }: { activity: AniListActivityItem }) {
  return (
    <a
      href={activity.url || "https://anilist.co/"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open AniList activity for ${activity.title}`}
      className="group flex min-w-0 gap-3 rounded-sm border border-white/10 bg-black/55 p-3 transition hover:border-neon-purple/40 hover:bg-neon-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
    >
      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-sm border border-neon-purple/20 bg-[#08090d]">
        {activity.coverImage ? (
          <Image
            src={activity.coverImage}
            alt={`Cover art for ${activity.title}`}
            fill
            sizes="56px"
            className="object-cover opacity-90 transition group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-black text-neon-purple/70">
            AL
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-gray-400">
          <span className="font-black text-neon-purple">{activity.mediaType || "MEDIA"}</span>
          <span className="text-gray-500">{formatActivityDate(activity.createdAt)}</span>
        </div>
        <p className="font-mono text-xs font-black uppercase leading-relaxed text-neon-lime">
          {formatActivityAction(activity)}
        </p>
        <h4 className="min-w-0 text-sm font-black uppercase leading-snug text-white line-clamp-2">
          {activity.title}
        </h4>
        <div className="mt-auto flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-gray-400">
          <span className="inline-flex items-center gap-1">
            <Heart className="h-3 w-3 text-neon-lime" aria-hidden="true" />
            {activity.likes} LIKES
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3 w-3 text-neon-blue" aria-hidden="true" />
            {activity.replies} REPLIES
          </span>
        </div>
      </div>
    </a>
  );
}

function AniListActivityPanel() {
  const username = siteSettings.anilistUsername || process.env.NEXT_PUBLIC_ANILIST_USERNAME || "";
  const hasUsername = !!username.trim();
  const { data, isLoading, error } = useQuery({
    queryKey: ["anilistActivity", username],
    queryFn: () => fetchAniListActivity(username, 6),
    enabled: hasUsername,
    staleTime: 1000 * 60 * 10,
  });

  const activities = (data || []).slice(0, 6);

  if (!hasUsername) {
    return <SignalState tone="purple" label="ANILIST_USERNAME_MISSING" copy="Add NEXT_PUBLIC_ANILIST_USERNAME to show recent public AniList activity." />;
  }

  if (isLoading) {
    return <SignalSkeleton label="SYNCING_ANILIST_ACTIVITY" />;
  }

  if (error) {
    return <SignalState tone="red" label="ANILIST_SIGNAL_OFFLINE" copy="AniList activity could not be synced. Favorite Anime remains available above." />;
  }

  if (activities.length === 0) {
    return <SignalState tone="neutral" label="NO_RECENT_ACTIVITY" copy="No recent public AniList activity was detected." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {activities.map((activity) => (
        <AniListActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

function MusicLogPanel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["lastfmRecentTracks"],
    queryFn: fetchRecentTracks,
    staleTime: 1000 * 60 * 5,
  });

  const tracks = (data?.tracks || []).slice(0, 6);
  const nowPlaying = tracks.find((track) => track.nowPlaying);
  const recentTracks = (nowPlaying ? tracks.filter((track) => !track.nowPlaying) : tracks).slice(0, nowPlaying ? 5 : 6);
  const isUnconfigured = data?.configured === false || data?.message === "LASTFM_CONFIG_MISSING";
  const isOffline = !!error || data?.message === "LASTFM_SIGNAL_OFFLINE";

  if (isLoading) {
    return <SignalSkeleton label="SYNCING_LASTFM_SIGNAL" />;
  }

  if (isUnconfigured) {
    return <SignalState tone="purple" label="LASTFM_CONFIG_MISSING" copy="Add server-side LASTFM_API_KEY and LASTFM_USERNAME to show scrobbling history." />;
  }

  if (isOffline) {
    return <SignalState tone="red" label="LASTFM_SIGNAL_OFFLINE" copy="Last.fm activity is temporarily unavailable. No playback is loaded." />;
  }

  if (tracks.length === 0) {
    return <SignalState tone="neutral" label="NO_RECENT_TRACKS" copy="No recent Last.fm tracks were detected." />;
  }

  return (
    <div className="flex flex-col gap-4">
      {nowPlaying && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neon-green">
            <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
            <span>NOW_PLAYING_SIGNAL</span>
          </div>
          <TrackCard track={nowPlaying} />
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neon-blue">
          <Radio className="h-3.5 w-3.5" aria-hidden="true" />
          <span>RECENT_SIGNALS</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {recentTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalState({ label, copy, tone }: { label: string; copy: string; tone: "purple" | "red" | "neutral" }) {
  const toneClass = tone === "red" ? "border-red-500/25 bg-red-500/5 text-red-300" : tone === "purple" ? "border-neon-purple/20 bg-neon-purple/5 text-neon-purple" : "border-white/10 bg-white/3 text-gray-300";

  return (
    <div className={`rounded-sm border p-4 text-sm leading-relaxed ${toneClass}`}>
      <div className="mb-2 flex items-center gap-2 font-mono text-xs font-black uppercase tracking-widest">
        <ShieldAlert className="h-4 w-4" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <p className="text-gray-300">{copy}</p>
    </div>
  );
}

function SignalSkeleton({ label }: { label: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="min-h-28 animate-pulse rounded-sm border border-white/10 bg-white/3" />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function SignalLogs() {
  const [activeTab, setActiveTab] = useState<SignalTab>("anilist");
  const tabs: Array<{ id: SignalTab; label: string; icon: typeof Tv }> = [
    { id: "anilist", label: "ANILIST_ACTIVITY", icon: Tv },
    { id: "music", label: "MUSIC_LOG", icon: Signal },
  ];

  return (
    <section id="signal-logs" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">
      <div className="mb-8 flex items-center gap-2 font-mono text-xs text-gray-400">
        <span className="font-mono text-neon-lime">[08]</span>
        <span className="font-semibold uppercase tracking-widest">SIGNAL_LOGS // ACTIVITY_CACHE</span>
        <div className="h-px grow bg-neon-lime/10" />
        <span className="text-[10px] uppercase text-neon-lime/40">LIMITED_FEED</span>
      </div>

      <div className="rounded-sm border border-neon-blue/15 bg-black/60 p-4 font-mono shadow-[0_0_18px_rgba(0,243,255,0.04)] sm:p-5">
        <div className="mb-5 flex flex-col gap-4 border-b border-white/5 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl">Signal Logs</h3>
            <p className="text-sm uppercase text-gray-400">
              {"// Recent AniList activity and Last.fm scrobbling signals."}
            </p>
          </div>

          <div role="tablist" aria-label="Signal log panels" className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`signal-panel-${tab.id}`}
                  id={`signal-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-sm border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${
                    isActive
                      ? "border-neon-lime bg-neon-lime text-black"
                      : "border-white/10 bg-black/60 text-gray-300 hover:border-neon-blue/40 hover:text-neon-blue"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{tab.label}</span>
                  {isActive && <span className="text-[9px]">[ACTIVE]</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`signal-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`signal-tab-${activeTab}`}
        >
          {activeTab === "anilist" ? <AniListActivityPanel /> : <MusicLogPanel />}
        </div>
      </div>
    </section>
  );
}