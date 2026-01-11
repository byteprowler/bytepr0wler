import Link from "next/link";
import { FiCoffee } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

export default function Coffee() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? {} : { y: [0, -10, 0] }}
      transition={reduceMotion ? {} : { repeat: Infinity, duration: 1 }}
      className="fixed bottom-6 sm:right-10 right-6 z-50"
    >
      <Link
        href="/buymeacoffee"
        aria-label="Support my work (Buy me a coffee)"
        title="Buy me a coffee ☕"
        className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-full border border-white/15 hover:bg-white/15 transition inline-flex"
      >
        <FiCoffee className="text-2xl sm:text-xl" />
      </Link>
    </motion.div>
  );
}