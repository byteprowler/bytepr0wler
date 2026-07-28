import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const BOOT_SESSION_KEY = "byteprowler_boot_sequence_seen";

const bootLines = [
  "loading profile modules... ok",
  "syncing operator identity... ok",
  "mounting project logs... ok",
  "initializing training arc registry... ok",
  "ready...",
];

interface BootSequenceProps {
  enabled?: boolean;
}

export default function BootSequence({ enabled = true }: BootSequenceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const completeBoot = () => {
    try {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, "true");
    } catch {
      // If sessionStorage is unavailable, never block the portfolio.
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    try {
      if (window.sessionStorage.getItem(BOOT_SESSION_KEY) === "true") {
        return;
      }
    } catch {
      return;
    }

    setIsVisible(true);

    if (shouldReduceMotion) {
      setLineCount(bootLines.length);
      const timeout = window.setTimeout(completeBoot, 650);
      return () => window.clearTimeout(timeout);
    }

    let index = 0;
    const lineInterval = window.setInterval(() => {
      index += 1;
      setLineCount(Math.min(index, bootLines.length));

      if (index >= bootLines.length) {
        window.clearInterval(lineInterval);
        window.setTimeout(completeBoot, 520);
      }
    }, 285);

    return () => window.clearInterval(lineInterval);
  }, [enabled, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {enabled && isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Byteprowler boot sequence loading"
          initial={shouldReduceMotion ? false : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.24 }}
          className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center bg-obsidian px-4 py-6 text-gray-100"
        >
          <div className="absolute inset-0 terminal-grid opacity-60" aria-hidden="true" />
          <div className="relative w-full max-w-xl rounded-sm border border-neon-lime/25 bg-black/90 p-4 font-mono shadow-[0_0_28px_rgba(197,255,0,0.08)] sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon-lime/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon-blue/75" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-neon-lime">
                ~/BYTEPROWLER
              </span>
            </div>

            <div className="space-y-2 text-sm leading-relaxed sm:text-base">
              <p className="text-neon-blue">&gt; npx byteprowler --profile</p>
              <div className="min-h-36 space-y-1.5 text-gray-200">
                {bootLines.slice(0, lineCount).map((line) => (
                  <p key={line}>
                    <span className="text-neon-lime">[OK]</span> {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[11px] uppercase tracking-wider text-gray-300">
                STATUS: {lineCount >= bootLines.length ? "READY" : "BOOTING"}
              </span>
              <button
                type="button"
                onClick={completeBoot}
                className="min-h-11 rounded-sm border border-neon-lime/30 bg-neon-lime/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-neon-lime transition hover:border-neon-lime hover:bg-neon-lime hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                Skip Boot
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}