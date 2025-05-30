import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import Button from "@/components/Button";
import { BsArrowRight } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { fadeIn } from "@/variants";
import { FiCheckSquare, FiX, FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";

const NOTIFICATION_TTL = 5000;
const COLORS_TOP = ["#f0f0f0", "#000000", "#dd3310", "#f15090"];

const Notification = ({ text, type = "success", id, removeNotif }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const timeoutRef = setTimeout(() => removeNotif(id), NOTIFICATION_TTL);
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
      className={`p-3 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg pointer-events-auto ${
        type === "error" ? "bg-red-600" : "bg-indigo-600"
      }`}
    >
      {type === "error" ? <FiAlertCircle /> : <FiCheckSquare />}
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto">
        <FiX />
      </button>
    </motion.div>
  );
};

export default function ContactForm() {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mode: "individual",
    projectType: "",
    budget: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNotification = (text, type = "success") => {
    setNotifications((prev) => [{ id: Date.now(), text, type }, ...prev]);
  };

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      addNotification("Please fill all required fields", "error");
      setIsSubmitting(false);
      return;
    }

    if (formData.mode === "hire" && (!formData.projectType || !formData.budget || !formData.timeline)) {
      addNotification("Please fill all company details", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Byte Prowler',
        message: formData.message,
        mode: formData.mode,
        ...(formData.mode === "hire" && {
          project_type: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline
        })
      };

      await emailjs.send(
        'service_dee38br',
        'template_zszt5pj',
        templateParams,
        'S-qjrJXN9BeEZmDl3'
      );

      addNotification("Email sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
        mode: "hire",
        projectType: "",
        budget: "",
        timeline: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      addNotification("Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Personal Info Section */}
      <div className='space-y-6'>
        <div className='flex flex-col gap-2'>
          <label className='text-white font-bold'>Hi 👋! My name is...</label>
          <input
            value={formData.name}
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Your name...'
            className='input'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-white font-bold'>My email is...</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='your@email.com'
            className='input lowercase'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-white font-bold'>And I represent...</label>
          <div className="flex gap-3">
            <Button
              icon={<FaRegCircleUser />}
              type="button"
              onClick={() => setFormData({...formData, mode: "individual"})}
              className={`px-4 py-2 rounded-lg transition-all ${
                formData.mode === "individual"
                  ? "bg-[#F15090] text-white"
                  : "bg-[#F15090]/30 text-white/70 hover:bg-[#F15090]/50"
              }`}
            >
              An Individual
            </Button>
            <Button
              icon={<FaUserFriends />}
              type="button"
              onClick={() => setFormData({...formData, mode: "hire"})}
              className={`px-4 py-2 rounded-lg transition-all ${
                formData.mode === "hire"
                  ? "bg-[#F15090] text-white"
                  : "bg-[#F15090]/30 text-white/70 hover:bg-[#F15090]/50"
              }`}
            >
              A Company
            </Button>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className='flex flex-col gap-2'>
        <label className='text-white font-bold'>My message...</label>
        <textarea
          value={formData.message}
          onChange={handleChange}
          name="message"
          placeholder='Tell me about your project...'
          className='textarea min-h-[120px]'
          required
        />
      </div>

      {/* Company Details Section */}
      {formData.mode === "hire" && (
        <div className="space-y-4">
          <div className='flex flex-col gap-2'>
            <label className='text-white font-bold'>Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select project type</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Fullstack App">Fullstack App</option>
              <option value="Bug Fixing">Bug Fixing</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white font-bold'>Estimated Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. $100 - $300"
              className="input"
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white font-bold'>Timeline</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g. 2 weeks"
              className="input"
              required
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type='submit'
        disabled={isSubmitting}
        className={`btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-[#F13024] group ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <FiLoader />
            Sending...
          </span>
        ) : (
          <>
            <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
              Let&apos;s talk
            </span>
            <BsArrowRight className='-translate-x-[120%] opacity-0 group-hover:flex group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
          </>
        )}
      </button>

      {/* Notifications */}
      <div className="flex flex-col gap-2 w-72 fixed top-4 right-4 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}