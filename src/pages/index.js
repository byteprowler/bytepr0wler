"use client";

import React, { useEffect } from "react";
import { fadeIn } from "@/variants";
import SocialIcons from "@/components/SocialIcons";
import Image from "next/image";
import Link from "next/link";
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
const COLORS_TOP = ["#f0f0f0", "#000000", "#dd1133", "#f15090"];

export default function Index() {
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
    <motion.section
      style={{ backgroundImage }}
      className="place-content-center min-h-screen py-40 px-4 text-white"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
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

          <motion.p className="mt-4 max-w-xl text-center text-gray-300 sm:text-lg">
            Fullstack Web Developer blending design and logic into seamless experiences.
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <SocialIcons />
          </motion.div>

          <Link href={"/projects"}>
            <motion.button
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group z-10 flex p-4 w-fit items-center gap-1.5 rounded-full bg-gray-950/10 text-gray-50 transition-colors hover:bg-gray-950/50"
            >
              Projects
            </motion.button>
          </Link>
        </div>

        {/* Avatar (Desktop) */}
        <motion.div
          className="hidden sm:block absolute right-10 top-16 w-52 h-52 z-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/Avatar.png"
              width={208}
              height={208}
              alt="ByteProwler Hacker Avatar"
              className="rounded-full border-4 border-[#F13024] shadow-xl object-cover"
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
  );
}