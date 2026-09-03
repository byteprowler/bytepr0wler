import { fadeIn } from "@/variants";
import SocialIcons from "@/components/SocialIcons";
import Image from "next/image";
import Button from "@/components/Button";
import { useCVActions } from "@/libs/cvUtils";
import { NextSeo } from "next-seo";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoLayers } from "react-icons/io5";
import { FaEye, FaPhone } from "react-icons/fa6";
import { BsDownload } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({ children }) => {
  const reduceMotion = useReducedMotion();
  const text = typeof children === "string" ? children : String(children ?? "");

  if (reduceMotion) {
    return <span className="text-[#F13024] font-black uppercase">{text}</span>;
  }

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-4xl md:text-6xl lg:text-7xl text-[#F13024]"
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {text.split("").map((l, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
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
            className="inline-block"
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
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

const VanishFlipText = ({
  words = ["Creativity", "Innovation", "Impact", "Excellence"],
  intervalMs = 5000,
}) => {
  const reduceMotion = useReducedMotion();
  const safeWords = Array.isArray(words) ? words.map((w) => String(w ?? "")) : ["Creativity"];
  const [idx, setIdx] = useState(0);

  const maxCh = useMemo(() => {
    return Math.max(...safeWords.map((w) => w.length), 1);
  }, [safeWords]);

  useEffect(() => {
    if (safeWords.length <= 1) return;

    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % safeWords.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [safeWords.length, intervalMs]);

  const word = safeWords[idx] ?? safeWords[0];

  if (reduceMotion) {
    return (
      <span
        className="inline-block text-[#F13024] font-black uppercase"
        style={{ minWidth: `${maxCh}ch` }}
      >
        {word}
      </span>
    );
  }

  return (
    <span className="inline-block align-baseline" style={{ minWidth: `${maxCh}ch` }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="inline-block"
        >
          <FlipText>{word}</FlipText>
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default function Index() {
  const { handleViewCV, handleDownloadCV, isDownloading, downloadError } = useCVActions();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <NextSeo
        title="ByteProwler | Full-Stack Developer"
        description="Frontend Developer building product-ready web apps with Next.js, Tailwind, and Django (REST/JWT)."
        canonical="https://byteprowler.vercel.app/"
        openGraph={{
          url: "https://byteprowler.vercel.app/",
          title: "ByteProwler | Portfolio",
          description: "Frontend Developer (Next.js + Django) • REST • JWT • Migrations",
          images: [
            {
              url: "https://byteprowler.vercel.app/byteprowler.jpeg",
              width: 800,
              height: 600,
              alt: "ByteProwler Portfolio",
            },
          ],
        }}
        twitter={{ cardType: "summary_large_image" }}
      />

      <section className="relative grid min-h-screen px-4 py-28 sm:py-36 text-white">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="flex sm:hidden mt-10 mb-4 mx-auto w-28 h-28"
            animate={reduceMotion ? {} : { y: [0, -10, 0] }}
            transition={reduceMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/Avatar.png"
              width={112}
              height={112}
              alt="ByteProwler Avatar"
              className="rounded-full border-2 border-[#F13024] shadow-lg object-cover"
              priority
            />
          </motion.div>

          <motion.span
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-2 inline-block rounded-full bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white/80 backdrop-blur"
          >
            ByteProwler
          </motion.span>

          <motion.h1
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-4xl text-center text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          >
            Where{" "}
            <span className="text-[#F13024] font-extrabold">Code</span> Meets{" "}
            <VanishFlipText
              intervalMs={4000}
              words={["Creativity", "Innovation", "Impact", "Excellence"]}
            />
          </motion.h1>

          <motion.p
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-4 max-w-2xl w-[90vw] text-center text-white/75 sm:text-lg"
          >
            I&apos;m a <span className="text-white font-semibold">Front-end Developer</span>{" "}
            building product-ready web apps with{" "}
            <span className="text-white">React/Next.js</span> and{" "}
            <span className="text-white">Tailwind</span> on the frontend, and{" "}
            <span className="text-white">Django</span> on the backend{" "}
            <span className="text-white/80">(REST APIs, JWT auth, migrations)</span>.
            I ship clean UI and reliable end-to-end features.
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.55)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-4"
          >
            <SocialIcons />
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.65)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-7 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button href="/contact" icon={<span className="text-lg"><FaPhone /></span>}>
              Contact
            </Button>

            <Button
              onClick={handleViewCV}
              disabled={isDownloading}
              icon={
                isDownloading ? (
                  <FiLoader className="animate-spin text-lg" />
                ) : (
                  <FaEye className="text-lg" />
                )
              }
            >
              {isDownloading ? "Working..." : "View CV"}
            </Button>

            <Button href="/projects" icon={<IoLayers className="text-lg" />}>
              Projects
            </Button>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.75)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-4"
          >
            <Button
              onClick={handleDownloadCV}
              icon={isDownloading ? <FiLoader className="animate-spin" /> : <BsDownload />}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
            >
              {isDownloading ? "Downloading..." : "Download CV"}
            </Button>

            {downloadError ? <p className="mt-2 text-xs text-red-400">{downloadError}</p> : null}
          </motion.div>

          <motion.div
            className="hidden sm:block absolute right-10 top-16 w-52 h-52 z-20"
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="relative w-full h-full"
              animate={reduceMotion ? {} : { y: [0, -10, 0] }}
              transition={reduceMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/Avatar.png"
                width={208}
                height={208}
                alt="ByteProwler Avatar"
                className="rounded-full border-4 border-[#F13024] shadow-xl object-cover"
                priority
              />

              <div className="absolute top-[45%] left-[25%] flex gap-6 pointer-events-none">
                <div className="w-3 h-3 rounded-full bg-[#F13024] blur-md animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-[#F13024] blur-md animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}