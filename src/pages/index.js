"use client";
import React, { useEffect } from "react";
import { fadeIn } from "@/variants";
import SocialIcons from "@/components/SocialIcons";
import Image from "next/image";
import { BsDownload } from "react-icons/bs";
import Button from "@/components/Button";
import { IoLayers } from "react-icons/io5"; 
import { FaEye } from "react-icons/fa6";
import { useCVActions } from "@/libs/cvUtils";
import { FiLoader } from "react-icons/fi";
import { NextSeo } from "next-seo";
import { COLORS_TOP } from "@/data/data";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

// FlipText Component
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({ children }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-4xl md:text-6xl lg:text-7xl text-[#F13024]"
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
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
        {children.split("").map((l, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
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

// Colors for animation

export default function Index() {

  const { 
    handleViewCV, 
    handleDownloadCV, 
    isDownloading, 
    downloadError 
  } = useCVActions();  

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <>
    <NextSeo
    title="Home | ByteProwler's Portfolio"
    description="Creative developer bringing Ideas to Life"
    canonical="https://byteprowler.vercel.app"
    openGraph={{
      url: "https://byteprowler.vercel.app",
      title: "ByteProwler's Portfolio | Welcome",
      description: "Creative Coding Brings Idea to Life",
      images: [
        {
          url: '/byteprowler.jpeg',
          width: 800,
          height: 600,
          alt: 'ByteProwler Portfolio'
        }
      ] 
    }} />
    <motion.section
      style={{ backgroundImage }}
      className="grid min-h-screen py-40 px-4 text-white"
      >
      <div className="flex flex-col items-center justify-center">
        {/* Avatar (Mobile) */}
        <motion.div
          className="flex sm:hidden mt-10 mb-4 mx-auto w-28 h-28"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
          className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-md"
          >
          ByteProwler
        </motion.span>

        <motion.h1
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="max-w-3xl bg-gradient-to-br from-white to-gray-200 bg-clip-text text-center text-3xl font-medium leading-tight sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          >
          Where <span className="text-[#F13024] font-semibold">Code</span> Meets{" "}
          <FlipText>Creativity</FlipText>
        </motion.h1>

        <motion.p
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-4 max-w-xl w-[90vw] text-center text-gray-300 sm:text-lg"
        >
          Developer with a designer&apos;s eye - merging aesthetic sensibility with technical precision to create digital experiences that engage and delight
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-4"
          >
          <SocialIcons />
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mt-6 flex flex-col md:flex-row gap-4"
        >
          <Button onClick={handleViewCV} disabled={isDownloading} icon={isDownloading ? <FiLoader className="animate-spin" /> : <FaEye className="text-lg" />}>
          {isDownloading ? 'loading' : 'View CV'}
          </Button>
          <Button onClick={handleDownloadCV} icon={isDownloading ? <FiLoader className="animate-spin" /> : <BsDownload className="text-lg" />}>{isDownloading ? 'loading' : 'Download CV'}</Button>
          <Button href="/projects" icon={<IoLayers className="text-lg" />}>
            Projects
          </Button>
        </motion.div>

        {/* Avatar (Desktop) */}
        <motion.div
          className="hidden sm:block absolute right-10 top-16 w-52 h-52 z-20"
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/Avatar.png"
              width={208}
              height={208}
              alt="ByteProwler Hacker Avatar"
              className="rounded-full border-4 border-[#F13024] shadow-xl object-cover"
              priority
            />
            {/* Glowing Eyes */}
            <div className="absolute top-[45%] left-[25%] flex gap-6 pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-[#F13024] blur-md animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-[#F13024] blur-md animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
    </>
  );
}