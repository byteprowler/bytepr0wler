import Curve from "@/components/Curve";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from '@/variants';
import CountUp from "react-countup";
import { NextSeo } from "next-seo";
import { aboutData } from "@/data/data";

const FlipText = ({children}) => {
  return (  
    <motion.span
      initial="initial"
      whileHover="hovered"
      className="relative inline-flex overflow-hidden text-3xl uppercase font-sans sm:text-3xl md:text-4xl lg:text-5xl text-[#F13024]"
      style={{
        lineHeight: 0.80,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
                x: 0,
              },
              hovered: {
                y: "100%",
                x: "100%"
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-flex"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "-100%",
              },
              hovered: {
                y: 0,
                x: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-flex"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};

const DURATION = 0.30;
const STAGGER = 0.025;

const getMonthsOfExperience = () => {
  const startDate = new Date("2024-05-31"); // Your starting date here
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const months = now.getMonth() - startDate.getMonth();
  return years * 12 + months;
};

const monthsOfExperience = getMonthsOfExperience();

export default function Index() {

  const [index, setIndex] = useState(0);

  return (
    <>
    <NextSeo
        title="About | ByteProwler"
        description="The journey of a passionate developer creating digital experiences"
        canonical="https://byteprowler.vercel.app"
        openGraph={{
          url: "https://byteprowler.vercel.app",
          title: "ByteProlwer's Portfolio | Welcome",
          description: "From curiosity to code - my developer journey",
          images: [
            {
              url: '/byteprowler.jpeg',
              width: 600,
              height: 600,
              alt: 'ByteProwler'
            }
          ] 
        }} />
    <Curve />
    <section
      className="min-h-screen"
    >
      <div className="py-36 px-4 text-white">
      <h2 className="h1 text-center text-white">About Me<span className="text-[#F13024]">.</span></h2>
      <div className="container flex flex-col items-center mx-auto xl:flex-row px-2 gap-x-2 py-10">
        <div className="flex-1 flex flex-col justify-center group">
          <Image alt="Photo of Byte Prowler" src="/byteprowler.jpeg" width={400} height={400} className="bg-center xl:h-[400] xl:w-[400] sm:h-[200] sm:w-[200] border border-white rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 flex flex-col justify-center text-white text-left">
        <h2 className="text-2xl font-semibold mb-4 text-center mx-auto mt-4 justify-center">
          Who is <span className="text-[#F13024]">ByteProwler</span>?
        </h2>
        <p className="mb-4 text-white max-w-[500px] mx-auto text-center">
          I&apos;m Ogo Joshua, a passionate solo freelance developer dedicated to creating innovative digital solutions. My mission is to deliver high-quality software that not only meets but exceeds client expectations.
        </p>
        <p className="mb-4 text-white text-center">
        <span className="text-[#F13024]">PS:</span> I also go by the alias <strong>ByteProwler</strong> — Founder of <strong>ByteCorp</strong> 🚀
        </p>
      <p className="mb-4 text-white max-w-[600px] mx-auto text-center">
        My expertise spans web development, mobile apps, and AI-driven solutions. I believe in the power of technology to transform businesses and elevate everyday experiences.
      </p>

          <p className=" text-white">
            <Link href={'/contact'}><span>Contact Us</span></Link> to learn more about our services and how we can help you achieve your goals.
          </p>
        </div>
      </div>
      <div className="container mx-auto flex flex-col items-center xl:flex-row gap-x-6">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2 
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className="h2 sm:text-3xl md:text-4xl lg:text-5xl text-center xl:text-left mb-4"
          >
            Creative <FlipText>Coding</FlipText> brings ideas to <FlipText  >Life</FlipText>
          </motion.h2>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className="max-w-[90vw] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-gray-200 capitalize"
          >
            {monthsOfExperience} Months ago, I began my journey as a Frontend Web Developer. Since then, I&apos;ve been honing my JavaScript skills, working on various projects, and collaborating with me and myself only.
          </motion.p>
          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {/* Experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-[#F13024] mb-2">
                  <CountUp start={0} end={monthsOfExperience} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Months of experience</div>
              </div>
              {/* Clients */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-[#F13024] mb-2">
                  <CountUp start={5} end={2} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Satisfied clients</div>
              </div>
              {/* Projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-[#F13024] mb-2">
                  <CountUp start={8} end={4} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Completed projects</div>
              </div>
              {/* Technologies */}
              <div className="flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-[#F13024] mb-2">
                  <CountUp start={0} end={6} duration={6} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Technologies used</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn('right', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-[#F13024] after:absolute after:-bottom-1 after:left-0 ${
                  index === itemIndex && 'text-[#F13024] after:w-[100%] after:bg-[#F13024] after:transition-all after:duration-300'
                }`}
                onClick={() => setIndex(itemIndex)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemIndex) => (
              <div key={itemIndex} className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60">
                <div className="font-light text-gray-200 mb-2 md:mb-0">{item.title}</div>
                {item.stage && <div className="hidden md:flex">-</div>}
                <div>{item.stage}</div>
                <div className="flex gap-x-4">
                  {item.icons?.map((icon) => (
                    <div key={icon.id} className="text-2xl inset-0 text-white">
                      {icon.icon}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
    </>
  );
}