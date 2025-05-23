import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { BsArrowRight } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import React, { useEffect } from "react";
import { fadeIn } from "@/variants";
import { FiCheckSquare, FiX } from "react-icons/fi";

const NOTIFICATION_TTL = 5000;

const COLORS_TOP = ["#f0f0f0", "#000000", "#dd3310", "#f15090"];

const Notification = ({ text, id, removeNotif }) => {
  
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    return () => clearTimeout(timeoutRef);
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ backgroundImage }}
      className="p-2 flex items-start rounded gap-2 text-xs bg-indigo-600 font-medium shadow-lg text-white pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default function ContactForm() {

  const [notifications, setNotifications] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [mode, setMode] = React.useState("hire");

  const addNotification = (text) => {
    setNotifications((prev) => [
      { id: Date.now(), text },
      ...prev,
    ]);
  };

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      addNotification("Please fill all fields.");
      return;
    }

    const serviceId = 'service_dee38br';
    const templateId = 'template_zszt5pj';
    const publicKey = 'S-qjrJXN9BeEZmDl3';

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Byte Prowler',
      message: message,
      p_type: projectype,
      budget: budget,
      timeline: timeline,
      mode: mode,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email Sent Successfully!', response);
        addNotification("Message sent!");
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        addNotification("Failed to send message.");
      });
  };

  return (
    <motion.form
      variants={fadeIn('up', 0.4)}
      initial='hidden'
      animate='show'
      onSubmit={handleSubmit}
      exit='hidden'
      className='flex-1 flex flex-col gap-6 w-full mx-auto'
    >
      <div className='flex flex-col gap-2'>
        <label>
          <span className='text-white font-extra-bold'>Hi 👋! My name is...</span>
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='your name...' name='user_name' className='input' />
      </div>

      <input value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' name='user_email' className='input lowercase' />

      <label>and I represent...</label>
      <div className="flex flex-row gap-2">
        <button
          type="button"
          onClick={() => setMode("individual")}
          className={`px-4 py-2 rounded-2xl ${mode === "individual"
            ? "bg-[#F15090] text-white"
            : "bg-[#F15090]/50 text-white/50"
            }`}>
          <span>An Individual</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("hire")}
          className={`px-4 py-2 rounded-2xl ${mode === "hire"
            ? "bg-[#F15090] text-white"
            : "bg-[#F15090]/50 text-white/50"
            }`}>
          A Company
        </button>
      </div>

      <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value)} name="message" placeholder='message' className='textarea' />

      {mode === "hire" && (
        <div className="space-y-4">
          <select
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-white"
            required
          >
            <option value="">Project Type</option>
            <option value={`frontend ${projectype}`}>Frontend Development</option>
            <option value={`fullstack ${projectype}`}>Fullstack App</option>
            <option value={`bug-fix ${projectype}`}>Bug Fixing</option>
            <option value={`consult ${projectype}`}>Consultation</option>
          </select>
          <input
            type="text"
            value={budget}
            placeholder="Estimated Budget (e.g. $100 - $300)"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-white"
            required
          />
          <input
            type="text"
            value={timeline}
            placeholder="Timeline (e.g. 2 weeks)"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-white"
            required
          />
        </div>
      )}

      <button
        type='submit'
        className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-[#F13024] group'>
        <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>Let&apos;s talk</span>
        <BsArrowRight className='-translate-x-[120%] opacity-0 group-hover:flex group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
      </button>

      <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
