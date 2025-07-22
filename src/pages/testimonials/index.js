"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { testimonials } from "@/data/data";
import Curve from "@/components/Curve";
import { NextSeo } from "next-seo";

const FanCard = ({ card, index, total, onSwipe }) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-20, 20]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  // Fan-style position & scale for the "peeking" cards behind
  const offsetY = index * -10;
  const scale = 1 - index * 0.05;
  const rotateFan = index * 3; // Slight fan curve

  const isTop = index === 0;

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      onSwipe(card.id);
    }
  };

  return (
    <motion.div
      className="absolute h-96 w-[90vw] max-w-sm rounded-xl p-6 bg-white/10 border border-white/20 backdrop-blur-md text-white shadow-xl cursor-grab active:cursor-grabbing"
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : `${rotateFan}deg`,
        opacity,
        zIndex: total - index,
        top: offsetY,
        scale,
      }}
    >
      <img
        src={card.image}
        alt={card.name}
        className="h-16 w-16 rounded-full mx-auto mb-3"
      />
      <h3 className="text-lg font-bold text-center">{card.name}</h3>
      <p className="text-sm text-center text-gray-400">{card.position}</p>
      <p className="text-sm text-center mt-3 italic">"{card.message}"</p>
    </motion.div>
  );
};

export default function Testimonials() {
  const [cards, setCards] = useState(testimonials);

  const handleSwipe = (id) => {
    setCards((prev) => {
      const updated = prev.filter((card) => card.id !== id);
      return updated.length ? updated : testimonials;
    });
  };

  return (
    <>
      <NextSeo
        title="Testimonials | ByteProwler"
        description="What others say about working with me"
        canonical="https://byteprowler.vercel.app"
        openGraph={{
          url: "https://byteprowler.vercel.app",
          title: "Testimonials | ByteProwler",
          description: "Feedback from clients and collaborators",
          images: [
            {
              url: "/byteprowler.jpeg",
              width: 600,
              height: 600,
              alt: "ByteProwler Portfolio",
            },
          ],
        }}
      />
      <Curve />

      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="relative h-[420px] w-full max-w-sm flex items-center justify-center">
          {cards
            .map((card, i) => ({ ...card, index: cards.length - 1 - i }))
            .sort((a, b) => a.index - b.index) // top card has index 0
            .map((card, i) => (
              <FanCard
                key={card.id}
                card={card}
                index={i}
                total={cards.length}
                onSwipe={handleSwipe}
              />
            ))}
        </div>

        {cards.length === 0 && (
          <p className="mt-8 text-center text-gray-400">
            No more testimonials left.
          </p>
        )}
      </section>
    </>
  );
}
