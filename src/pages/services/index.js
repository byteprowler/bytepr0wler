
import { NextSeo } from "next-seo"
import {
  motion
 } from "framer-motion";
import { serviceData } from "@/data/data";
import { fadeIn } from "@/variants";
import Curve from "@/components/Curve";

export default function Services() {

  return (
    <>
    <NextSeo
      title="Services | ByteProwler"
      description="What I can build for you"
      canonical="https://byteprowler.vercel.app"
      openGraph={{
        url: "https://byteprowler.vercel.app",
        title: "My Services | ByteProwler",
        description: "Creative Solutions for your digital needs",
        images: [{
          url: '/byteprowler.jpeg',
          width: 800,
          height: 800
        }]
      }} />
    
    <Curve />
    <section
     className="min-h-screen">
      <div className="py-36">
        <h1 className="h1 text-center text-white">Our Services<span className="text-3xl text-[#F13024]">.</span></h1>
        <motion.p
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className=' mb-4 max-w-[400px] mx-auto text-center text-white'>We offer a variety of services to meet your needs, including web development, UI/UX design, and more. Let&apos;s work together to bring your ideas to life.</motion.p>
          <div className="grid mx-auto max-w-7xl grid-flow-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 mt-10">
          {
            serviceData.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 0.2 + index * 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="p-6 bg-white/10 rounded-lg shadow-lg text-center text-white"
            >
              <div className="text-4xl mb-4">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-[#F13024]">{service.title}</h2>
              <p className="text-base text-white">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
