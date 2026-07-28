import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ShieldAlert, Cpu, Radio } from "lucide-react";
import { fetchUserFavourites, fallbackAnimeList } from "../../lib/anilist";
import AnimeCard from "../ui/AnimeCard";

export default function AnimeFeed() {
    const username = process.env.NEXT_PUBLIC_ANILIST_USERNAME || "";

    // React Query fetch
    const { data, isLoading, error } = useQuery({
        queryKey: ["anilistFavourites", username],
        queryFn: () => fetchUserFavourites(username),
        enabled: !!username,
    });

    // Decide source
    const hasUsername = !!username;
    const showFallback = !hasUsername || error ? true : false;
    const animeData = showFallback ? fallbackAnimeList : (data || []);

    return (
        <section id="anime" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">

            {/* HUD Header Grid Section Indicator */}
            <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
                <span className="text-neon-lime font-mono">[05]</span>
                <span className="tracking-widest font-semibold uppercase">ANIMEFEED // WATCHLIST_CACHE</span>
                <div className="flex-grow h-[1px] bg-neon-lime/10"></div>
                <span className="text-[10px] text-neon-lime/40 uppercase">PERSONAL_CACHE</span>
            </div>

            <div className="flex flex-col gap-8">

                {/* Section title header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
                            AnimeFeed
                        </h3>
              <span lang="ja" className="font-mono text-sm font-bold text-neon-purple/85">視聴記録</span>
                        <p className="text-sm font-mono text-gray-400 uppercase">
                            {"// Personal media cache: favorite anime entries detected."}
                        </p>
                    </div>

                    {/* Connection status header badging */}
                    <div className="flex items-center gap-2.5 font-mono text-[10px] px-3 py-1.5 bg-black/40 border border-white/5 rounded-xs">
                        <Radio className={`w-3.5 h-3.5 ${hasUsername ? "text-neon-green animate-pulse" : "text-neon-purple"}`} />
                        <span className="text-gray-400">CONN_GATEWAY:</span>
                        <span className={hasUsername ? "text-neon-green font-bold" : "text-neon-purple font-bold"}>
                            {hasUsername ? `ANILIST_NODE_CONN (${username.toUpperCase()})` : "LOCAL_SIMULATION_GATE"}
                        </span>
                    </div>
                </div>

                {/* Environmental Fallback Announcement Warning */}
                {!hasUsername && (
                    <div className="border border-neon-purple/20 bg-neon-purple/5 p-4 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[10.5px] leading-relaxed text-gray-400">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-neon-purple shrink-0 mt-0.5 animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-white font-black uppercase tracking-wider">
                                    ENVIRONMENT CONFIGURATION WARNING
                                </span>
                                <span className="mt-0.5 max-w-2xl font-mono text-[10px] text-gray-400 leading-normal">
                                    &quot;NEXT_PUBLIC_ANILIST_USERNAME&quot; is not currently configured in local environment assets.
                                    Showing a compact local favorites cache until a live AniList username is configured.
                                </span>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-white/10 px-3 py-2 rounded-xs flex flex-col gap-1 w-full md:w-auto font-mono text-[10px]">
                            <span className="text-neon-purple font-bold">{"// IN THE ROOT .env.local FILE ADD:"}</span>
                            <code className="text-neon-lime break-all">NEXT_PUBLIC_ANILIST_USERNAME=your_username</code>
                        </div>
                    </div>
                )}

                {/* Error state message details */}
                {hasUsername && error && (
                    <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-sm flex items-start gap-3 font-mono text-[10.5px] leading-relaxed text-gray-400">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-white font-black uppercase tracking-wider">
                                COMM_LINK_DECRYPTION_ERROR
                            </span>
                            <span className="mt-0.5 text-red-400 font-semibold font-mono text-[10px]">
                                {error instanceof Error ? error.message : "Failed to establish secure request handshakes."}
                            </span>
                        </div>
                    </div>
                )}

                {/* Loading / fetching nodes state */}
                {hasUsername && isLoading ? (
                    <div className="py-16 flex flex-col items-center justify-center gap-4 font-mono select-none">
                        <Cpu className="w-8 h-8 text-neon-purple animate-spin" />
                        <div className="flex flex-col items-center text-center gap-1">
                            <span className="text-xs font-black text-white uppercase tracking-widest animate-pulse">
                                DECRYPTING_GATEWAY_TELEMETRY...
                            </span>
                            <span className="text-[10.5px] text-gray-500 uppercase">
                                Sending GraphQL queries to AniList server nodes.
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Anime Card Grid list output */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {animeData.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                )}

            </div>

        </section>
    );
}
