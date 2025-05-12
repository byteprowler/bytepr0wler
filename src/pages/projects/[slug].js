import { display } from "@/data/projects";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import Link from "next/link";

const COLORS_TOP = ["#f0f0f0", "#000000", "#d31010", "#f15090"];

export default function ShowPost() {
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

  const router = useRouter();
  const { slug } = router.query;

  const showroom = display.find((d) => d.slug === slug);

  if (!showroom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <motion.main
      style={{ backgroundImage }}
      className="min-h-screen py-20 px-6 text-white text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{showroom.title}<span className="text-[#F13024]">.</span></h1>
        
        <p className="text-lg text-gray-300 mb-6">{showroom.description}</p>
        
        <div className="mb-6">
          <span className="text-sm uppercase text-gray-400">Tech Stack:</span>
          <ul className="flex flex-wrap justify-center gap-2 mt-2">
              <li
                key={showroom.id}
                className="bg-[#1f2937] px-3 py-1 rounded-full text-sm text-white"
              >
                {showroom.techStack.join(",")}
              </li>
          </ul>
        </div>

          <div className="mb-6">
            <Image
              src={showroom.url}
              alt={showroom.title}
              width={500}
              height={500}
              className="mx-auto rounded-2xl shadow-lg w-full max-w-lg"
            />
          </div>

        {showroom.link && (
          <Link
            href={showroom.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: showroom.color,
            }}
            className={`inline-block text-white font-semibold py-2 px-6 rounded-full transition-all duration-300`}
          >
            Visit Live Site
          </Link>
        )}
      </div>
    </motion.main>
  );
}