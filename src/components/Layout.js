import Head from "next/head";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "./Header";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Coffee from "./Coffee";
import { COLORS_TOP } from "@/data/data";

export default function Layout({ children }) {
  const router = useRouter();
  const isCoffee = router.pathname === "/buymeacoffee";

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
    <div>
      <Head>
        <title>ByteProwler</title>
        <meta name="description" content="Coding Ideas to Life" />
        <meta name="keywords" content="html, tailwindcss, js, javascript" />

        <meta property="og:title" content="ByteProwler - Coding Ideas to Life" />
        <meta
          property="og:description"
          content="Where Coding Meets Creativity, Every Byte Counts Toward a Terabyte."
        />
        <meta property="og:image" content="/byteprowler.jpeg" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ByteProwler - Coding Ideas to Life" />
        <meta
          name="twitter:description"
          content="Where Coding Meets Creativity, Small Steps Lead to Gigantic Results."
        />
        <meta name="twitter:image" content="/byteprowler.jpeg" />
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
      </Head>

      <Header />
      <BottomNav />

      {!isCoffee && <Coffee />}

      <motion.div style={{ backgroundImage }}>
        {children}
      </motion.div>
    </div>
  );
}