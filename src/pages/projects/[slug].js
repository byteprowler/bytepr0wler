import { display } from "@/data/data";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { COLORS_TOP } from "@/data/data";
import {
  FaReact, FaHtml5, FaCss3, FaJs
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiFramer
} from "react-icons/si";

const techIcons = {
  "Next.js": <SiNextdotjs className="text-white" />,
  "React": <FaReact className="text-[#61DAFB]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#38BDF8]" />,
  "Framer Motion": <SiFramer className="text-[#0055FF]" />,
  "HTML": <FaHtml5 className="text-[#E34F26]" />,
  "CSS": <FaCss3 className="text-[#264de4]" />,
  "JavaScript": <FaJs className="text-[#f7df1e]" />,
};


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
    <main
      className="min-h-screen py-20 px-6 text-white text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{showroom.title}<span style={{ color: showroom.color }}>.</span></h1>
        <p className="text-lg text-gray-300 mb-6">{showroom.description}</p>
        
        <div className="mb-6">
          <span className="text-sm uppercase text-gray-400">Tech Stack:</span>
          <ul className="flex flex-wrap justify-center gap-2 mt-2">
            {showroom.techStack.map((tech, index) => (
              <li
              key={index}
              className="bg-[#1f2937] px-3 py-2 rounded-full text-white flex items-center gap-2 text-sm">
                {techIcons[tech] || tech}
                {tech}
              </li>
            ))}
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
    </main>
  );
}