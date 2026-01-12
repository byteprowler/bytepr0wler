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

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://byteprowler.vercel.app";
  const OG_IMAGE = `${BASE_URL}/byteprowler.webp`;

  return (
    <div>
      <Head>
        <title>ByteProwler</title>
        <meta name="description" content="Coding Ideas to Life" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ByteProwler" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content="ByteProwler - Coding Ideas to Life" />
        <meta
          property="og:description"
          content="Where Coding Meets Creativity, Every Byte Counts Toward a Terabyte."
        />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:alt" content="ByteProwler" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ByteProwler - Coding Ideas to Life" />
        <meta
          name="twitter:description"
          content="Where Coding Meets Creativity, Small Steps Lead to Gigantic Results."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
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