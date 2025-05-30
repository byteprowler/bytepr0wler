import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const CYCLES_PER_LETTER = 3;
const SHUFFLE_TIME = 60;
const CHARS = "!@#$%^&*():{};|,.<>/?";

export default function Button({ children, href, type, onClick, disabled, icon = <FiLock /> }) {
  const TARGET_TEXT = children;
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);
  
  const scramble = () => {
    let pos = 0;
    
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      
      setText(scrambled);
      pos++;
      
      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };
  
  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };
  
  // Use motion.a if href is provided, otherwise motion.button
  const ButtonComponent = href ? motion.a : motion.button;

  return (
    <ButtonComponent
      variants={fadeIn("up", 0.5)}
      initial="hidden"
      animate="show"
      exit="hidden"
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      href={href}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className="group relative overflow-hidden hover:cursor-pointer rounded-lg border-[1px] border-neutral-500 bg-transparent px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300"
    >
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </ButtonComponent>
  );
}