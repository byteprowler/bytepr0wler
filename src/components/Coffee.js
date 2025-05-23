import { FiCoffee } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Coffee() {
  return (
    <motion.a
    href="/buymeacoffee" 
    animate={{ y: [0, -10, 0] }} // simple bounce loop
    transition={{ repeat: Infinity, duration: 1 }}
    className="fixed bottom-6 sm:right-10 right-6 bg-indigo-500 text-white p-4 rounded-full shadow-lg">
          <FiCoffee className='text-2xl sm:text-xl' title="Buy me a coffee ☕" />
    </motion.a>
  )
}
