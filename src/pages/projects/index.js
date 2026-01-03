import { useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useTransform, useScroll, useReducedMotion } from "framer-motion";
import { NextSeo } from "next-seo";

import { fadeIn } from "@/variants";
import { display as disp } from "@/data/data";
import Curve from "@/components/Curve";

/**
 * Card width + gap are used to compute a reasonable translate range.
 * Keep these in sync with tailwind classes in Card/Track.
 */
const CARD_W = 450;
const GAP = 16; // gap-4 = 1rem = 16px

const dedupeBySlug = (items = []) => {
  const seen = new Set();
  return items.filter((it) => {
    if (!it?.slug) return false;
    if (seen.has(it.slug)) return false;
    seen.add(it.slug);
    return true;
  });
};

const Card = ({ card }) => {
  return (
    <Link
      href={`/projects/${card.slug}`}
      aria-label={`Open project: ${card.title}`}
      className="group relative h-[360px] w-[320px] sm:h-[420px] sm:w-[420px] xl:h-[450px] xl:w-[450px]
                 overflow-hidden rounded-xl bg-neutral-900 shadow-md outline-none ring-offset-2
                 focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {/* Background image (optimized) */}
      <Image
        src={card.url}
        alt={card.title}
        fill
        sizes="(max-width: 640px) 320px, (max-width: 1280px) 420px, 450px"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        priority={false}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Title chip */}
      <div className="absolute inset-0 grid place-content-center px-6">
        <p
          className="max-w-[90%] rounded-xl border border-white/10 bg-white/10 px-6 py-4 text-center
                     text-2xl sm:text-3xl xl:text-4xl font-black uppercase text-white backdrop-blur-md
                     translate-x-[500%] group-hover:translate-x-0 transition-all duration-300 delay-150"
        >
          {card.title}
        </p>
      </div>

      {/* Subtle bottom hint */}
      <div className="absolute bottom-4 left-4 text-xs text-white/70">
        View details →
      </div>
    </Link>
  );
};

const HorizontalScrollCarousel = ({ projects }) => {
  const shouldReduceMotion = useReducedMotion();
  const targetRef = useRef(null);

  // Desktop: vertical scroll controls horizontal movement
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Estimate track width in pixels (good enough without measuring DOM)
  const maxShiftPx = useMemo(() => {
    const count = projects.length;
    if (count <= 1) return 0;
    return (CARD_W + GAP) * (count - 1);
  }, [projects.length]);

  // Move left as user scrolls down the section
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShiftPx]);

  // Mobile / reduced motion: swipe horizontally instead of scroll-transform
  if (shouldReduceMotion) {
    return (
      <section className="py-6">
        <div className="flex gap-4 overflow-x-auto px-2 pb-3 snap-x snap-mandatory">
          {projects.map((p) => (
            <div key={p.id ?? p.slug} className="snap-center shrink-0">
              <Card card={p} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[260vh] xl:h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4 will-change-transform px-2"
          aria-label="Projects carousel"
        >
          {projects.map((p) => (
            <Card card={p} key={p.id ?? p.slug} />
          ))}
        </motion.div>
      </div>

      {/* Mobile helper hint (still shows, but swipe works better there) */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70 backdrop-blur">
          Tip: On mobile, you can swipe sideways.
        </span>
      </div>
    </section>
  );
};

export default function Projects() {
  const projects = useMemo(() => dedupeBySlug(disp), []);

  return (
    <>
      <NextSeo
        title="Projects | ByteProwler"
        description="A collection of my projects—frontend builds, UI engineering, and product-ready interfaces."
        canonical="https://byteprowler.vercel.app/projects"
        openGraph={{
          url: "https://byteprowler.vercel.app/projects",
          title: "Projects | ByteProwler",
          description: "Explore my work—projects, builds, and case-study style breakdowns.",
          images: [
            {
              url: "https://byteprowler.vercel.app/byteprowler.jpeg",
              width: 600,
              height: 600,
              alt: "ByteProwler",
            },
          ],
        }}
      />

      <Curve />

      <section className="min-h-screen px-4 py-28 xl:py-36 text-white">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-center"
          >
            My Projects<span className="text-[#F13024]">.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto mb-6 max-w-[520px] text-center text-white/85"
          >
            A mix of frontend builds and product UI work. Each project highlights clean UI,
            responsive layout, and real-world integration patterns.
          </motion.p>

          <motion.div
            variants={fadeIn("down", 0.55)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-8 flex items-center justify-center"
          >
            <span className="animate-pulse rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase text-white/70 backdrop-blur">
              ↓ Keep scrolling… projects slide sideways 😎
            </span>
          </motion.div>

          {projects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
              No projects yet — add items to <code className="text-white">/data/data</code>.
            </div>
          ) : (
            <HorizontalScrollCarousel projects={projects} />
          )}

          <div className="mt-10 flex items-center justify-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70 backdrop-blur">
              ⚒️ More projects shipping soon. Stay tuned.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}