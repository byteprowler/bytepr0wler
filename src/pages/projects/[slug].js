import { useRouter } from "next/router";
import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { NextSeo } from "next-seo";

import { fadeIn } from "@/variants";
import { display } from "@/data/data";
import Button from "@/components/Button";

import { FaReact, FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFramer } from "react-icons/si";

const techIcons = {
  "Next.js": <SiNextdotjs className="text-white" />,
  React: <FaReact className="text-[#61DAFB]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#38BDF8]" />,
  "Framer Motion": <SiFramer className="text-[#0055FF]" />,
  HTML: <FaHtml5 className="text-[#E34F26]" />,
  CSS: <FaCss3 className="text-[#264de4]" />,
  JavaScript: <FaJs className="text-[#f7df1e]" />,
};

const defaultColor = "#F13024";

export default function ProjectDetails() {
  const router = useRouter();
  const slug = useMemo(() => {
    const raw = router.query?.slug;
    if (!raw) return "";
    return Array.isArray(raw) ? raw[0] : raw;
  }, [router.query]);

  // Wait until Next Router is ready so we don’t “fail-find” on first render
  if (!router.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const project = display.find((d) => d.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Project not found</h1>
        <p className="text-white/70 mb-6">
          The link may be wrong, or the project slug is missing in your data file.
        </p>
        <Button href="/projects">Back to Projects</Button>
      </div>
    );
  }

  const dotColor = project.color || defaultColor;

  return (
    <>
      <NextSeo
        title={`${project.title} | ByteProwler`}
        description={project.description}
        canonical={`https://byteprowler.vercel.app/projects/${project.slug}`}
        openGraph={{
          url: `https://byteprowler.vercel.app/projects/${project.slug}`,
          title: `${project.title} | ByteProwler`,
          description: project.description,
          images: [
            {
              url: `https://byteprowler.vercel.app${project.url}`,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ],
        }}
      />

      <main className="min-h-screen py-28 xl:py-36 px-4 text-white text-center bg-black">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {project.title}
            <span style={{ color: dotColor }}>.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 mb-3">
            {project.description}
          </p>

          {/* Optional, but looks professional for client + job */}
          <p className="text-sm sm:text-base text-white/60 mb-6">
            Frontend-first build with clean UI, responsive layout, and smooth interaction patterns.
          </p>

          {!!project.techStack?.length && (
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-white/50">
                Tech Stack
              </span>
              <ul className="flex flex-wrap justify-center gap-2 mt-3">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="bg-white/10 border border-white/10 px-3 py-2 rounded-full text-white flex items-center gap-2 text-xs sm:text-sm"
                  >
                    {techIcons[tech] || <span className="text-white/80">•</span>}
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <Image
              src={project.url}
              alt={project.title}
              width={1000}
              height={650}
              priority
              className="mx-auto rounded-2xl shadow-lg w-full max-w-3xl object-cover border border-white/10"
            />
          </div>

          <motion.div
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {project.link && (
              <Button
                icon={<FaLink className="text-lg" />}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}

            {project.sourceCode && (
              <Button
                icon={<FaGithub className="text-lg" />}
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </Button>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}