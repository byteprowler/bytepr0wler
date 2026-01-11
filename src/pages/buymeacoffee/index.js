import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { FaCopy, FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { wallets, banks } from "@/data/data";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { NextSeo } from "next-seo";

const NOTIFICATION_TTL = 3000;

const animationVariants = {
  wrapper: {
    open: {
      scaleY: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.05 },
    },
    closed: {
      scaleY: 0,
      transition: { when: "afterChildren", staggerChildren: 0.05 },
    },
  },
  icon: { open: { rotate: 180 }, closed: { rotate: 0 } },
  item: {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -12, transition: { duration: 0.18 } },
  },
};

function Notification({ text, id, removeNotif }) {
  useEffect(() => {
    const t = setTimeout(() => removeNotif(id), NOTIFICATION_TTL);
    return () => clearTimeout(t);
  }, [id, removeNotif]);

  return (
    <motion.div
      initial={{ y: -15, scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3 flex items-center rounded-lg gap-2 text-sm font-medium shadow-lg text-white bg-[#f15090] pointer-events-auto border border-white/10"
      role="status"
    >
      <FiCheckSquare />
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
}

export default function BuyMeACoffeePage() {
  const containerRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null); // "method" | "bank" | "crypto" | null
  const [copiedKey, setCopiedKey] = useState(null);

  const selectedBankObj = useMemo(
    () => banks.find((b) => b.name === selectedBank),
    [selectedBank]
  );

  const addNotification = useCallback((text) => {
    const id = Date.now();
    setNotifications((prev) => [{ id, text }, ...prev].slice(0, 3));
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const closeAllDropdowns = useCallback(() => setOpenDropdown(null), []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) closeAllDropdowns();
    };

    const onEsc = (e) => {
      if (e.key === "Escape") closeAllDropdowns();
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [closeAllDropdowns]);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const safeCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(el);
        return ok;
      } catch {
        return false;
      }
    }
  };

  const copyToClipboard = async (text, label) => {
    if (!text) return;

    const ok = await safeCopy(String(text));
    if (!ok) {
      addNotification("Copy failed. Please copy manually.");
      return;
    }

    setCopiedKey(label);
    addNotification(`${label} copied ✅`);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const onSelectMethod = (method) => {
    setSelectedMethod(method);
    closeAllDropdowns();
    setSelectedBank("");
    setSelectedCrypto(null);
  };

  const onSelectBank = (bankName) => {
    setSelectedBank(bankName);
    setSelectedCrypto(null);
    closeAllDropdowns();
  };

  const onSelectCrypto = (wallet) => {
    setSelectedCrypto(wallet);
    setSelectedBank("");
    closeAllDropdowns();
  };

  return (
    <>
      <NextSeo
        title="Support ☕ | ByteProwler"
        description="Support my work with a tip — or contact me for collaborations and freelance projects."
        canonical="https://byteprowler.vercel.app/buymeacoffee"
        openGraph={{
          url: "https://byteprowler.vercel.app/buymeacoffee",
          title: "Support My Work | ByteProwler",
          description: "Support my work with a tip — or contact me for collaborations and freelance.",
          images: [
            {
              url: "https://byteprowler.vercel.app/byteprowler.jpeg",
              width: 600,
              height: 600,
              alt: "ByteProwler",
            },
          ],
        }}
      />

      <section className="min-h-screen py-20 px-4 text-white grid place-items-center">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
          <AnimatePresence>
            {notifications.map((n) => (
              <Notification key={n.id} id={n.id} text={n.text} removeNotif={removeNotification} />
            ))}
          </AnimatePresence>
        </div>

        <div ref={containerRef} className="w-full max-w-xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            className="border border-white/20 bg-gradient-to-br from-white/5 to-black/30 p-6 rounded-xl shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-2 text-center">Support My Work ☕</h1>

            {/* ✅ Professional text inserted here */}
            <p className="text-white/80 text-center leading-relaxed">
              If my work has been helpful and you’d like to support what I’m building, you can send
              a tip using any method below. For collaborations, partnerships, or freelance projects,
              reach out via my{" "}
              <Link href="/contact" className="text-[#f15090] font-semibold hover:underline">
                contact page
              </Link>
              .
            </p>
          </motion.div>

          {/* Method dropdown */}
          <div className="space-y-4">
            <div className="relative">
              <motion.button
                type="button"
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => toggleDropdown("method")}
                whileTap={{ scale: 0.98 }}
                aria-expanded={openDropdown === "method"}
              >
                <span>{selectedMethod || "Choose Payment Method"}</span>
                <motion.span
                  animate={openDropdown === "method" ? "open" : "closed"}
                  variants={animationVariants.icon}
                >
                  <IoIosArrowDown />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {openDropdown === "method" && (
                  <motion.ul
                    className="absolute z-10 w-full mt-1 rounded-lg border border-white/20 bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden origin-top"
                    variants={animationVariants.wrapper}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {["Bank Transfer", "Crypto Payment"].map((method) => (
                      <motion.li
                        key={method}
                        className="px-4 py-2 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0"
                        variants={animationVariants.item}
                        onClick={() => onSelectMethod(method)}
                      >
                        {method}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Bank dropdown */}
            {selectedMethod === "Bank Transfer" && (
              <motion.div
                key="bank"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => toggleDropdown("bank")}
                  whileTap={{ scale: 0.98 }}
                  aria-expanded={openDropdown === "bank"}
                >
                  <span>{selectedBank || "Select Bank"}</span>
                  <motion.span
                    animate={openDropdown === "bank" ? "open" : "closed"}
                    variants={animationVariants.icon}
                  >
                    <IoIosArrowDown />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {openDropdown === "bank" && (
                    <motion.ul
                      className="absolute z-10 w-full mt-1 rounded-lg border border-white/20 bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden origin-top"
                      variants={animationVariants.wrapper}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {banks.map((bank) => (
                        <motion.li
                          key={bank.name}
                          className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-2 border-b border-white/5 last:border-b-0"
                          variants={animationVariants.item}
                          onClick={() => onSelectBank(bank.name)}
                        >
                          <span className="text-lg">{bank.icon}</span>
                          <span>{bank.name}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Crypto dropdown */}
            {selectedMethod === "Crypto Payment" && (
              <motion.div
                key="crypto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.button
                  type="button"
                  className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => toggleDropdown("crypto")}
                  whileTap={{ scale: 0.98 }}
                  aria-expanded={openDropdown === "crypto"}
                >
                  <span>{selectedCrypto?.name || "Select Cryptocurrency"}</span>
                  <motion.span
                    animate={openDropdown === "crypto" ? "open" : "closed"}
                    variants={animationVariants.icon}
                  >
                    <IoIosArrowDown />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {openDropdown === "crypto" && (
                    <motion.ul
                      className="absolute z-10 w-full mt-1 rounded-lg border border-white/20 bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden origin-top"
                      variants={animationVariants.wrapper}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {wallets.map((wallet) => (
                        <motion.li
                          key={wallet.name}
                          className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-2 border-b border-white/5 last:border-b-0"
                          variants={animationVariants.item}
                          onClick={() => onSelectCrypto(wallet)}
                        >
                          <span className="text-lg">{wallet.icon}</span>
                          <span>{wallet.name}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Bank details */}
          {selectedBank && selectedBankObj && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-white/20 bg-gradient-to-br from-white/5 to-black/30 p-4 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <h3 className="font-medium mb-3 text-center">Bank Transfer Details</h3>

              <div className="space-y-2">
                <p className="text-white">
                  <span className="text-white/70">Bank:</span> {selectedBank}
                </p>
                <p className="text-white">
                  <span className="text-white/70">Account Name:</span> Ogo Joshua Agama
                </p>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-white flex-1">
                    <span className="text-white/70">Account Number:</span>{" "}
                    {selectedBankObj?.NUBAN || "-"}
                  </p>

                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={() => copyToClipboard(selectedBankObj?.NUBAN, `${selectedBank} Account Number`)}
                    aria-label="Copy Account Number"
                  >
                    {copiedKey === `${selectedBank} Account Number` ? (
                      <FaCheck className="text-lg text-green-400" />
                    ) : (
                      <FaCopy className="text-lg" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Crypto details */}
          {selectedCrypto && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-white/20 bg-gradient-to-br from-white/5 to-black/30 p-4 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <h3 className="font-medium mb-3 text-center">
                {selectedCrypto.name} Wallet Address
              </h3>

              <div className="space-y-3">
                {selectedCrypto.networks?.map((network, index) => {
                  const key = `${selectedCrypto.name}:${network.network}:${index}`;
                  return (
                    <div key={key} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm text-white/70 mb-1">
                        <span className="font-medium text-white">Network:</span> {network.network}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-white font-mono break-all flex-1">
                          {network.address}
                        </p>

                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                          onClick={() => copyToClipboard(network.address, network.network)}
                          aria-label="Copy address"
                        >
                          {copiedKey === network.network ? (
                            <FaCheck className="text-lg text-green-400" />
                          ) : (
                            <FaCopy className="text-lg" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}