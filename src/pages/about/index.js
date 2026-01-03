import Curve from "@/components/Curve";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/variants";
import CountUp from "react-countup";
import { NextSeo } from "next-seo";
import { aboutData, display } from "@/data/data";

/** ----------------------------
 *  FlipText constants
 *  ---------------------------- */
const DURATION = 0.3;
const STAGGER = 0.025;

/** ----------------------------
 *  FlipText (reduced-motion safe)
 *  ---------------------------- */
const FlipText = ({ children }) => {
  const reduceMotion = useReducedMotion();
  const text = typeof children === "string" ? children : "";

  if (reduceMotion) {
    return <span className="text-[#F13024] font-semibold uppercase">{text}</span>;
  }

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative inline-flex overflow-hidden text-3xl uppercase font-sans sm:text-3xl md:text-4xl lg:text-5xl text-[#F13024]"
      style={{ lineHeight: 0.8 }}
    >
      <div>
        {text.split("").map((l, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-flex"
            variants={{
              initial: { y: 0, x: 0 },
              hovered: { y: "100%", x: "100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0">
        {text.split("").map((l, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-flex"
            variants={{
              initial: { y: "-100%", x: 0 },
              hovered: { y: 0, x: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};

/** ----------------------------
 *  Helpers
 *  ---------------------------- */
const getMonthsOfExperience = (startISO = "2024-05-31") => {
  const startDate = new Date(startISO);
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth();
  return Math.max(0, years * 12 + months);
};

const uniqueSlugCount = (arr = []) => {
  const s = new Set();
  arr.forEach((p) => {
    if (p?.slug) s.add(p.slug);
  });
  return s.size;
};

export default function About() {
  const [tabIndex, setTabIndex] = useState(0);

  const monthsOfExperience = useMemo(() => getMonthsOfExperience("2024-05-31"), []);
  const projectsCount = useMemo(() => uniqueSlugCount(display), []);

  // Set these to whatever is true for you
  const CLIENTS_COUNT = 2;
  const TECH_COUNT = 6;

  const stats = useMemo(
    () => [
      { label: "Months of experience", value: monthsOfExperience, suffix: "+" },
      { label: "Satisfied clients", value: CLIENTS_COUNT, suffix: "+" },
      { label: "Completed projects", value: Math.max(4, projectsCount), suffix: "+" },
      { label: "Technologies used", value: TECH_COUNT, suffix: "+" },
    ],
    [monthsOfExperience, projectsCount]
  );

  const safeAboutData = Array.isArray(aboutData) ? aboutData : [];
  const activeTab = safeAboutData[tabIndex] || safeAboutData[0] || { info: [] };

  return (
    <>
      <NextSeo
        title="About | ByteProwler"
        description="About ByteProwler — Full-Stack Developer building product-ready web apps with Next.js and Django."
        canonical="https://byteprowler.vercel.app/about"
        openGraph={{
          url: "https://byteprowler.vercel.app/about",
          title: "About | ByteProwler",
          description: "From curiosity to code — my developer journey.",
          images: [
            {
              url: "https://byteprowler.vercel.app/byteprowler.jpeg",
              width: 800,
              height: 800,
              alt: "ByteProwler",
            },
          ],
        }}
        twitter={{ cardType: "summary_large_image" }}
      />

      <Curve />

      <section className="min-h-screen">
        <div className="py-28 xl:py-36 px-4 text-white">
          <h2 className="h1 text-center text-white">
            About Me<span className="text-[#F13024]">.</span>
          </h2>

          {/* Intro */}
          <div className="container mx-auto flex flex-col items-center xl:flex-row gap-8 py-10">
            <motion.div
              variants={fadeIn("up", 0.25)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex-1 flex justify-center"
            >
              <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] xl:w-[380px] xl:h-[380px]">
                <Image
                  alt="Photo of ByteProwler"
                  src="/byteprowler.jpeg"
                  fill
                  priority
                  className="rounded-full object-cover border border-white/20 shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.35)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex-1 flex flex-col justify-center text-center xl:text-left"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Who is <span className="text-[#F13024]">ByteProwler</span>?
              </h3>

              <p className="mb-4 text-white/80 max-w-[640px] mx-auto xl:mx-0">
                I’m <span className="text-white font-semibold">Ogo Joshua</span> — a{" "}
                <span className="text-white font-semibold">Full-Stack Developer</span>{" "}
                building product-ready web apps. I care about clean UI, solid backend logic,
                and experiences that feel professional.
              </p>

              <p className="mb-4 text-white/80 max-w-[640px] mx-auto xl:mx-0">
                <span className="text-[#F13024] font-semibold">Stack:</span>{" "}
                Next.js + Tailwind (frontend) and Django (backend) — REST APIs, JWT auth, and migrations.
              </p>

              <p className="mb-6 text-white/80 max-w-[640px] mx-auto xl:mx-0">
                <span className="text-[#F13024] font-semibold">PS:</span> I also go by{" "}
                <strong>ByteProwler</strong> — Founder of <strong>Prowler Labs</strong> 🚀
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition w-fit mx-auto xl:mx-0"
              >
                Contact me → Let’s build
              </Link>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="container mx-auto flex flex-col items-center xl:flex-row gap-x-10">
            {/* Left side */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.h2
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="h2 sm:text-3xl md:text-4xl lg:text-5xl text-center xl:text-left mb-4"
              >
                Creative <FlipText>Coding</FlipText> brings ideas to{" "}
                <FlipText>Life</FlipText>
              </motion.h2>

              <motion.p
                variants={fadeIn("right", 0.35)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="max-w-[720px] mx-auto xl:mx-0 mb-6 xl:mb-10 px-2 xl:px-0 text-white/75"
              >
                {monthsOfExperience} months ago, I started building web apps. Today, I ship full-stack
                features end-to-end — from UI to APIs — with a focus on clarity, responsiveness,
                and real-world delivery.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={fadeIn("right", 0.5)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
              >
                <div className="flex flex-1 xl:gap-x-6">
                  {stats.map((s, idx) => (
                    <div
                      key={s.label}
                      className={`relative flex-1 ${idx !== stats.length - 1
                          ? "after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0"
                          : ""
                        }`}
                    >
                      <div className="text-2xl xl:text-4xl font-extrabold text-[#F13024] mb-2">
                        <CountUp start={0} end={s.value} duration={2.5} />
                        {s.suffix}
                      </div>
                      <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[140px] text-white/70">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right side (Tabs) */}
            <motion.div
              variants={fadeIn("left", 0.35)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col w-full xl:max-w-[48%] min-h-[480px]"
            >
              <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-6 flex-wrap justify-center xl:justify-start">
                {safeAboutData.map((item, itemIndex) => (
                  <button
                    key={item.title || itemIndex}
                    type="button"
                    onClick={() => setTabIndex(itemIndex)}
                    className={`capitalize xl:text-lg relative pb-1 outline-none transition ${tabIndex === itemIndex
                        ? "text-[#F13024]"
                        : "text-white/70 hover:text-white"
                      }`}
                  >
                    {item.title}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-[#F13024] transition-all duration-300 ${tabIndex === itemIndex ? "w-full" : "w-0"
                        }`}
                    />
                  </button>
                ))}
              </div>

              <div className="py-2 xl:py-6 flex flex-col gap-y-3 xl:gap-y-5 items-center xl:items-start">
                {(activeTab.info || []).map((item, itemIndex) => (
                  <div
                    key={`${item.title}-${itemIndex}`}
                    className="flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/70"
                  >
                    <div className="font-light text-white mb-1 md:mb-0">
                      {item.title}
                    </div>

                    {item.stage ? (
                      <>
                        <div className="hidden md:flex text-white/40">-</div>
                        <div className="text-white/60">{item.stage}</div>
                      </>
                    ) : null}

                    {Array.isArray(item.icons) && item.icons.length > 0 ? (
                      <div className="flex gap-x-4 mt-2 md:mt-0 md:ml-3">
                        {item.icons.map((icon) => (
                          <div
                            key={icon.id}
                            className="text-2xl text-white"
                            aria-label={icon.id}
                            title={icon.id}
                          >
                            {icon.icon}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tiny closing CTA */}
          <div className="container mx-auto mt-10 text-center">
            <p className="text-white/70">
              Want a full-stack web app built clean and fast?{" "}
              <Link href="/contact" className="text-[#F13024] font-semibold">
                Contact me
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}