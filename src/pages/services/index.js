import React, { useMemo, useState } from "react";
import { NextSeo } from "next-seo";
import { motion, AnimatePresence } from "framer-motion";
import { serviceData } from "@/data/data";
import { fadeIn } from "@/variants";
import Curve from "@/components/Curve";
import Link from "next/link";

const getSpanClass = (i) => {
  const spans = [
    "sm:col-span-2 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-1",
    // "sm:col-span-1 sm:row-span-2", // tall
    "sm:col-span-2 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
  ];
  return spans[i % spans.length];
};

const BentoCard = ({ service, onPreview, onSelect, spanClass, isTall }) => {
  const [hovered, setHovered] = useState(false);

  const bulletLimit = isTall ? 7 : 4;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={() => {
        setHovered(true);
        onPreview?.();
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        setHovered(true);
        onPreview?.();
      }}
      onBlur={() => setHovered(false)}
      onClick={(e) => {
        e.currentTarget.blur(); // prevent “stuck focus”
        setHovered(false);
        onSelect?.();
      }}
      className={[
        "group relative h-full w-full overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.06] p-6 text-left",
        "shadow-lg outline-none transition",
        "hover:border-white/20 hover:bg-white/[0.09]",
        "focus-visible:ring-2 focus-visible:ring-white/60",
        spanClass,
      ].join(" ")}
    >
      {/* Base content */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -6 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative z-10 flex items-start gap-4"
      >
        <div className="text-4xl text-white/90">{service.icon}</div>

        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-[#F13024]">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-white/70">{service.description}</p>
        </div>
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute inset-0 z-20 flex flex-col justify-end p-6"
      >
        {/* Full cover */}
        <div className="absolute inset-0 bg-black/85" />

        {/* ✅ Scrollable content so text never gets cut */}
        <div
          className="relative overflow-y-auto pr-4 no-scrollbar"
          style={{ maxHeight: isTall ? "85%" : "70%" }}
        >
          <p className="text-sm text-white/95">
            {service.details ?? service.description}
          </p>

          {Array.isArray(service.bullets) && service.bullets.length > 0 ? (
            <ul className="mt-3 space-y-1 text-xs text-white/85">
              {service.bullets.slice(0, bulletLimit).map((b, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-[#F13024]">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-4 text-xs text-white/60">
            Scroll to see more • Click selects this service ↑
          </div>
        </div>
      </motion.div>

      {/* Subtle blob */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#F13024]/15 blur-3xl opacity-0 group-hover:opacity-100 transition" />
    </motion.button>
  );
};

export default function Services() {
  const services = useMemo(() => serviceData ?? [], []);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = useMemo(
    () => services[activeIndex] ?? services?.[0] ?? null,
    [services, activeIndex]
  );

  return (
    <>
      <NextSeo
        title="Services | ByteProwler"
        description="Full-Stack services (Next.js + Django): web apps, UI/UX, performance, SEO, and more."
        canonical="https://byteprowler.vercel.app/services"
        openGraph={{
          url: "https://byteprowler.vercel.app/services",
          title: "Services | ByteProwler",
          description: "Full-Stack Developer offering product-ready web solutions.",
          images: [
            {
              url: "https://byteprowler.vercel.app/byteprowler.jpeg",
              width: 800,
              height: 800,
              alt: "ByteProwler",
            },
          ],
        }}
        twitter={{ cardType: "summary_large_image" }}
      />

      <Curve />

      <section className="min-h-screen bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-28 xl:py-36 text-white">
          <h1 className="h1 text-center">
            Services<span className="text-3xl text-[#F13024]">.</span>
          </h1>

          <motion.p
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-4 mb-10 max-w-[650px] mx-auto text-center text-white/75"
          >
            Hover a card to preview details (scroll inside). Click a card to select it in the panel.
          </motion.p>

          {/* Selected panel */}
          <div className="mb-10 flex justify-center">
            <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.06] p-6">
              <AnimatePresence mode="wait">
                {activeService ? (
                  <motion.div
                    key={activeService.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs uppercase tracking-wider text-white/50">
                      Selected service
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#F13024]">
                      {activeService.title}
                    </h2>
                    <p className="mt-2 text-white/80">
                      {activeService.details ?? activeService.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm hover:bg-white/15 transition"
                      >
                        Contact me →
                      </Link>
                      <Link
                        href="/projects"
                        className="rounded-full border border-white/15 bg-transparent px-5 py-2 text-sm hover:bg-white/10 transition"
                      >
                        View projects →
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* Bento Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            // ✅ give cards a bit more height so text fits better
            style={{ gridAutoRows: "220px" }}
          >
            {services.map((service, index) => {
              const span = getSpanClass(index);
              const isTall = span.includes("row-span-2");

              return (
                <motion.div
                  key={`${service.title}-${index}`}
                  variants={fadeIn("up", 0.15 + index * 0.05)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className={span}
                >
                  <BentoCard
                    service={service}
                    spanClass="h-full"
                    isTall={isTall}
                    onPreview={() => setActiveIndex(index)}
                    onSelect={() => setActiveIndex(index)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
