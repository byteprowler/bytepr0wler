import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { NextSeo } from "next-seo";
import { fadeIn } from "@/variants";
import { display as disp } from "@/data/data";
import Curve from "@/components/Curve";

const CARD_W = 450;
const GAP = 16;

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
  const href = `/projects/${card.slug}`;
  const [open, setOpen] = useState(false);

  const togglePreview = (e) => {
    // If user clicked the MORE link, don't toggle the preview
    if (e.target.closest?.('[data-more="true"]')) return;
    setOpen((v) => !v);
  };

  return (
    <section
      data-open={open}
      tabIndex={0}
      onClick={togglePreview}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
        if (e.key === "Escape") setOpen(false);
      }}
      className={[
        "group relative block select-none",
        "h-[360px] w-[320px] sm:h-[420px] sm:w-[420px] xl:h-[450px] xl:w-[450px]",
        "overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.06] shadow-lg",
        "outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      ].join(" ")}
    >
      {/* DEFAULT: Full image */}
      <div className="absolute inset-0">
        <Image
          src={card.url}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 320px, (max-width: 1280px) 420px, 450px"
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      {/* DEFAULT chip */}
      <div className="absolute left-4 top-4 z-10">
        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
          Tap to preview
        </span>
      </div>

      {/* HOVER/TAP reveal (desktop hover + keyboard focus + mobile tap via data-open) */}
      <div
        className={[
          "absolute inset-0",
          "opacity-0 transition-opacity duration-300",
          "pointer-events-none",
          "group-hover:opacity-100 group-hover:pointer-events-auto",
          "group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
          "data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto",
        ].join(" ")}
      >
        <div className="grid h-full w-full grid-cols-[1.05fr_0.95fr] grid-rows-2">
          {/* Top-left info */}
          <div className="relative overflow-hidden bg-black text-white p-6 col-span-2">
            <h3 className="text-2xl font-extrabold leading-tight">{card.title}</h3>
            <p className="mt-3 text-sm text-white/75 leading-relaxed line-clamp-4">
              {card.description ?? "Project description coming soon."}
            </p>
          </div>

          {/* Right panel (ONLY CLICKABLE PART) */}
          <div className="col-start-1 row-span-1 bg-white text-black flex items-center justify-center">
            <Link
              data-more="true"
              href={href}
              aria-label={`Open project: ${card.title}`}
              className="group/more rounded-xl px-6 py-4 text-center transition hover:scale-[1.02] active:scale-[0.99]"
              onClick={() => setOpen(false)}
            >
              <div className="text-xs font-semibold tracking-widest text-black/60 uppercase">
                Open
              </div>
              <div className="mt-2 text-2xl font-black">
                MORE <span className="inline-block translate-y-[-1px]">↗</span>
              </div>
              <div className="mt-2 text-xs text-black/60">
                (tap to open)
              </div>
            </Link>
          </div>

          {/* Bottom-left cropped image */}
          <div className="relative overflow-hidden">
            <Image
              src={card.url}
              alt={`${card.title} preview`}
              fill
              sizes="(max-width: 640px) 320px, (max-width: 1280px) 420px, 450px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                Preview
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle hover ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition" />
    </section>
  );
};


const HorizontalScrollCarousel = ({ projects }) => {
  const shouldReduceMotion = useReducedMotion();
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: targetRef });

  const maxShiftPx = useMemo(() => {
    const count = projects.length;
    if (count <= 1) return 0;
    return (CARD_W + GAP) * (count - 1);
  }, [projects.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShiftPx]);

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

      <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70 backdrop-blur">
          ↓ Keep scrolling… projects slide sideways
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
        description="A collection of my projects—clean UI, responsive builds, and product-ready interfaces."
        canonical="https://byteprowler.vercel.app/projects"
        openGraph={{
          url: "https://byteprowler.vercel.app/projects",
          title: "Projects | ByteProwler",
          description: "Explore my work—projects and case-study style breakdowns.",
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
            className="mx-auto mb-6 max-w-[560px] text-center text-white/85"
          >
            Hover a card to see the “swap layout” reveal. Click to open the full
            project page.
          </motion.p>

          {projects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
              No projects yet — add items to <code className="text-white">/data/data</code>.
            </div>
          ) : (
            <HorizontalScrollCarousel projects={projects} />
          )}
        </div>
      </section>
    </>
  );
}