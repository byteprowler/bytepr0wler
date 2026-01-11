import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { fadeIn } from "@/variants";
import { FiCheckSquare, FiX, FiAlertCircle, FiLoader } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, type = "success", id, removeNotif }) => {
  const isError = type === "error";

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`p-3 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg pointer-events-auto border ${isError
          ? "bg-red-600/90 border-red-300/30"
          : "bg-indigo-600/90 border-indigo-300/30"
        }`}
      role={isError ? "alert" : "status"}
    >
      {isError ? (
        <FiAlertCircle className="mt-[2px]" />
      ) : (
        <FiCheckSquare className="mt-[2px]" />
      )}

      <span className="pr-2">{text}</span>

      <button
        type="button"
        onClick={() => removeNotif(id)}
        className="ml-auto opacity-90 hover:opacity-100 transition"
        aria-label="Close notification"
      >
        <FiX />
      </button>
    </motion.div>
  );
};

export default function ContactForm() {
  const [notifications, setNotifications] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mode: "individual",
    projectType: "",
    budget: "",
    timeline: "",
    website: "",
  });

  const API_BASE = useMemo(
    () => (process.env.NEXT_PUBLIC_CONTACT_API_URL || "").replace(/\/+$/, ""),
    []
  );

  const removeNotif = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (text, type = "success") => {
      const id = Date.now();
      setNotifications((prev) => [{ id, text, type }, ...prev]);
      window.setTimeout(() => removeNotif(id), NOTIFICATION_TTL);
    },
    [removeNotif]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isCompany = formData.mode === "company";

  const buildMessage = () => {
    const baseMsg = formData.message.trim();

    if (!isCompany) return baseMsg;

    return [
      `Mode: Company`,
      `Project Type: ${formData.projectType || "-"}`,
      `Budget: ${formData.budget || "-"}`,
      `Timeline: ${formData.timeline || "-"}`,
      ``,
      `Message:`,
      baseMsg,
    ].join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (formData.website?.trim()) {
      addNotification("Message received. I’ll get back to you soon!", "success");
      setIsSubmitting(false);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addNotification("Please fill all required fields.", "error");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      addNotification("Please enter a valid email address.", "error");
      setIsSubmitting(false);
      return;
    }

    if (
      isCompany &&
      (!formData.projectType || !formData.budget.trim() || !formData.timeline.trim())
    ) {
      addNotification("Please fill all company/project details.", "error");
      setIsSubmitting(false);
      return;
    }

    if (!API_BASE) {
      addNotification("API URL not configured. Set NEXT_PUBLIC_CONTACT_API_URL.", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        subject: formData.mode === "company"
          ? `Company Inquiry from ${formData.name}`
          : `Individual Inquiry from ${formData.name}`,
        message: buildMessage() + `\n\n- From: ${formData.name.trim()}`,
      };

      const res = await fetch(`${API_BASE}/api/contact/send/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg =
          (typeof data?.error === "string" && data.error) ||
          (data?.error && JSON.stringify(data.error)) ||
          "Failed to send. Please try again.";
        addNotification(errMsg, "error");
        setIsSubmitting(false);
        return;
      }

      addNotification(data?.message || "Message delivered ✅ I’ll reply soon!");
      setFormData({
        name: "",
        email: "",
        message: "",
        mode: "individual",
        projectType: "",
        budget: "",
        timeline: "",
        website: "",
      });
    } catch (error) {
      console.error("Contact API error:", error);
      addNotification("Network error. Please try again in a moment.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col gap-6 w-full mx-auto"
    >
      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Personal Info */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-white font-bold">
            Hi 👋! My name is<span className="text-[#F13024]">*</span>
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Your name..."
            className="input"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white font-bold">
            My email is<span className="text-[#F13024]">*</span>
          </label>
          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="your@email.com"
            className="input lowercase"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-white font-bold">And I represent...</span>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  mode: "individual",
                  projectType: "",
                  budget: "",
                  timeline: "",
                }))
              }
              className={`px-4 py-2 rounded-lg transition-all inline-flex items-center gap-2 ${!isCompany
                  ? "bg-[#F15090] text-white"
                  : "bg-[#F15090]/30 text-white/70 hover:bg-[#F15090]/50"
                }`}
            >
              <FaRegCircleUser />
              An Individual
            </button>

            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, mode: "company" }))}
              className={`px-4 py-2 rounded-lg transition-all inline-flex items-center gap-2 ${isCompany
                  ? "bg-[#F15090] text-white"
                  : "bg-[#F15090]/30 text-white/70 hover:bg-[#F15090]/50"
                }`}
            >
              <FaUserFriends />
              A Company
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-white font-bold">
          My message<span className="text-[#F13024]">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          name="message"
          placeholder="Tell me what you’re building…"
          className="textarea min-h-[120px]"
          required
        />
      </div>

      {/* Company Details */}
      {isCompany && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="projectType" className="text-white font-bold">
              Project Type<span className="text-[#F13024]">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select project type</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Full-Stack App (Next.js + Django)">
                Full-Stack App (Next.js + Django)
              </option>
              <option value="Bug Fixing">Bug Fixing</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-white font-bold">
              Estimated Budget<span className="text-[#F13024]">*</span>
            </label>
            <input
              id="budget"
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. $100 - $300"
              className="input"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="timeline" className="text-white font-bold">
              Timeline<span className="text-[#F13024]">*</span>
            </label>
            <input
              id="timeline"
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

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300
          flex items-center justify-center overflow-hidden hover:border-[#F13024] group relative
          ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <FiLoader className="animate-spin" />
            Sending...
          </span>
        ) : (
          <>
            <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
              Let&apos;s talk
            </span>
            <BsArrowRight className="-translate-x-[120%] opacity-0 group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
          </>
        )}
      </button>

      {/* Notifications */}
      <div
        className="flex flex-col gap-2 w-80 fixed top-4 right-4 z-50 pointer-events-none"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification key={n.id} {...n} removeNotif={removeNotif} />
          ))}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}