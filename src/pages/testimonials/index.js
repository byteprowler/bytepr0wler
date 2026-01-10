"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/data";
import Curve from "@/components/Curve";
import { NextSeo } from "next-seo";
import Image from "next/image";

export default function Testimonials() {
  const [activeId, setActiveId] = useState(testimonials?.[0]?.id ?? null);

  const safeTestimonials = useMemo(
    () => (Array.isArray(testimonials) ? testimonials : []),
    []
  );

  const active = useMemo(
    () => safeTestimonials.find((t) => t.id === activeId) || safeTestimonials[0],
    [activeId, safeTestimonials]
  );

  return (
    <>
      <NextSeo
        title="Testimonials | ByteProwler"
        description="What others say about working with me"
        canonical="https://byteprowler.vercel.app/testimonials"
        openGraph={{
          url: "https://byteprowler.vercel.app/testimonials",
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

      <section className="min-h-screen px-4 text-white">
        <div className="container mx-auto pt-28 xl:pt-36 pb-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Testimonials<span className="text-[#F13024]">.</span>
            </h1>
            <p className="text-white/70 mt-3">
              Words from clients and collaborators I’ve worked with.
            </p>
          </div>

          {/* Featured */}
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
            >
              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 items-start">
                <div className="flex md:flex-col items-center md:items-start gap-4">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border border-white/15">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="md:hidden">
                    <p className="font-semibold">{active.name}</p>
                    <p className="text-white/60 text-sm">{active.position}</p>
                  </div>
                </div>

                <div>
                  <div className="hidden md:block">
                    <p className="text-xl font-semibold">{active.name}</p>
                    <p className="text-white/60">{active.position}</p>
                  </div>

                  <p className="mt-4 text-white/85 text-lg leading-relaxed">
                    “{active.message}”
                  </p>

                  {/* Optional: small proof line if you have it */}
                  {/* <p className="mt-4 text-white/50 text-sm">Project: XYZ • 2025</p> */}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {safeTestimonials.slice(0, 6).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveId(t.id)}
                        className={`rounded-full px-3 py-1 text-sm border transition ${t.id === activeId
                            ? "border-[#F13024] text-white bg-[#F13024]/10"
                            : "border-white/10 text-white/70 hover:text-white hover:border-white/20"
                          }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {safeTestimonials.map((t) => (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className={`text-left rounded-2xl p-5 border backdrop-blur-md transition ${t.id === activeId
                    ? "border-[#F13024]/60 bg-[#F13024]/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.position}</p>
                  </div>
                </div>

                <p className="mt-4 text-white/75 text-sm leading-relaxed line-clamp-4">
                  “{t.message}”
                </p>

                <p className="mt-4 text-[#F13024] text-sm">
                  Read full →
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}