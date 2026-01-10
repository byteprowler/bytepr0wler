import {
  FiBatteryCharging,
  FiWifi,
} from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/variants";
import { NextSeo } from "next-seo";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Curve from "@/components/Curve";

const Phone = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: reduceMotion ? "none" : "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-gradient-to-bl from-[#f15090] to-[#d31] p-[2px]"
      aria-label="Phone mockup"
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={
          reduceMotion
            ? { transform: "translateZ(8px) translateY(0px)" }
            : { transform: "translateZ(32px) translateY(-8px)" }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
              ease: "easeInOut",
            }
        }
        className="relative h-96 w-56 rounded-[24px] border-2 border-b-4 border-r-4
                   border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-1/2 top-2.5 z-10 h-2 w-16 -translate-x-1/2 rounded-md bg-neutral-900" />
      <div className="absolute right-4 top-2 z-10 flex gap-2 text-[#f15090]">
        <FiWifi aria-label="wifi" />
        <FiBatteryCharging aria-label="battery charging" />
      </div>
    </>
  );
};

const Screen = () => {
  return (
    <div className="relative z-10 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
      <Image
        src="/logo2.png"
        height={300}
        width={200}
        alt="ByteProwler logo"
        priority
      />

      <a
        href="#contact-form"
        className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border border-[#f15090]/30 bg-white/90
                   py-2 text-center text-sm font-semibold text-[#f15090] backdrop-blur
                   hover:bg-white transition"
      >
        Contact
      </a>

      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-[#f15090] to-[#d31]" />
    </div>
  );
};

export default function Contact() {
  return (
    <>
      <NextSeo
        title="Contact | ByteProwler"
        description="Contact ByteProwler — Full-Stack Developer (Next.js + Django). Let’s build something clean, fast, and reliable."
        canonical="https://byteprowler.vercel.app/contact"
        openGraph={{
          url: "https://byteprowler.vercel.app/contact",
          title: "Contact | ByteProwler",
          description:
            "Full-Stack Developer (Next.js + Django). Available for freelance, collaborations, and opportunities.",
          images: [
            {
              url: "https://byteprowler.vercel.app/byteprowler.jpeg",
              width: 800,
              height: 600,
              alt: "ByteProwler",
            },
          ],
        }}
        twitter={{ cardType: "summary_large_image" }}
      />

      <Curve />

      <section className="min-h-screen bg-gray-950 text-gray-200">
        <div className="mx-auto w-full max-w-[900px] px-4 py-28 xl:py-36">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mb-3 text-center"
          >
            Contact Me<span className="text-[#F13024]">.</span>
          </motion.h2>

          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto mb-10 max-w-[620px] text-center text-white/70"
          >
            I’m a <span className="text-white font-semibold">Full-Stack Developer</span> (Next.js + Django).
            Tell me what you’re building and I’ll reply with the best approach + timeline.
          </motion.p>

          <div className="flex flex-col items-center gap-10 xl:flex-row xl:items-start xl:justify-between">
            <motion.div
              variants={fadeIn("down", 0.45)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full xl:w-auto flex justify-center"
            >
              <Phone />
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.45)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full xl:flex-1"
            >
              <div id="contact-form" className="scroll-mt-28">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}