import { useState, useEffect } from "react";
import {
  motion,
  animate,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { testimonials, COLORS_TOP } from "@/data/data";
import Curve from "@/components/Curve";
import { NextSeo } from "next-seo";



const Card = ({ id, image, name, position, message, setCards, cards }) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prev) => {
        const newCards = prev.filter((v) => v.id !== id);
        if (newCards.length === 0) {
          // Reset the cards when they are all swiped
          return testimonials;
        }
        return newCards;
      });
    }
  };

  return (
    <motion.div
    className="h-96 w-[90vw] max-w-sm origin-bottom rounded-lg object-cover hover:cursor-grab active:cursor-grabbing shadow-lg"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
      animate={{
        scale: isFront ? 1 : 0.90,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: -1,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="p-4">
        <img src={image} alt={name} className="h-16 w-16 rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-center text-gray-500">{name}</h3>
        <p className="text-center text-xl text-white">{position}</p>
        <p className="text-center mt-4 text-md text-white">{message}</p>
      </div>
    </motion.div>
  );
};

export default function Index() {
  const [cards, setCards] = useState(testimonials);

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

  return (
  <>
    <NextSeo
        title="Testimonials | ByteProwler"
        description="What Others say about working with me"
        canonical="https://byteprowler.vercel.app"
        openGraph={{
          url: "https://byteprowler.vercel.app",
          title: "Testimonials | ByteProwler",
          description: "Feedback from clients and collaborators",
          images: [
            {
              url: '/byteprowler.jpeg',
              width: 600,
              height: 600,
              alt: 'ByteProwler Portfolio'
            }
          ] 
        }} />

  <Curve />
    <motion.div
      style={{
        backgroundImage,
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="grid h-[500px] w-full place-items-center relative">
        {cards.map((card) => {
          return (
            <Card key={card.id} cards={cards} setCards={setCards} {...card} />
          );
        })}
        {cards.length === 0 && (
          <p className="text-lg font-semibold text-gray-600">
            No more testimonials left!
          </p>
        )}
      </div>
    </motion.div>
      </>
  );
}