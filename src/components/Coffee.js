import { FiCoffee } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Coffee() {
  return (
    <motion.a
    href="/buymeacoffee" 
    animate={{ y: [0, -10, 0] }} // simple bounce loop
    transition={{ repeat: Infinity, duration: 1 }}
    className="fixed bottom-6 sm:right-10 right-6 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full">
          <FiCoffee className='text-2xl sm:text-xl' title="Buy me a coffee ☕" />
    </motion.a>
  )
}
