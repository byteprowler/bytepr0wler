import Link from "next/link";
import { FiBriefcase } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

export default function Coffee() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? {} : { y: [0, -6, 0] }}
      transition={reduceMotion ? {} : { repeat: Infinity, duration: 1.4 }}
      className="fixed bottom-6 sm:right-10 right-6 z-50"
    >
      <Link
        href="/#contact"
        aria-label="Open work and collaboration contact channel"
        title="Start a project"
        className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-full border border-white/15 hover:bg-white/15 transition inline-flex"
      >
        <FiBriefcase className="text-2xl sm:text-xl" />
      </Link>
    </motion.div>
  );
}
