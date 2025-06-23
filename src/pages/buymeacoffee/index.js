import { 
  motion, 
  AnimatePresence
} from "framer-motion";
import { useState } from "react";
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
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
      },
    },
  },
  icon: {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  },
  item: {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2 }
    },
  },
  copyButton: {
    initial: { scale: 1 },
    tapped: { scale: 0.95 },
    success: { scale: 1.1, color: "#4ade80" }
  }
};

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => removeNotif(id), NOTIFICATION_TTL);
    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3 flex items-center rounded-lg gap-2 text-sm font-medium shadow-lg text-white bg-[#f15090] pointer-events-auto"
    >
      <FiCheckSquare />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto">
        <FiX />
      </button>
    </motion.div>
  );
};

export default function SupportPage() {
  const [notifications, setNotifications] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(null);

  const addNotification = (text) => {
    const id = Date.now();
    setNotifications((prev) => [{ id, text }, ...prev]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const copyToClipboard = (text, identifier) => {
  navigator.clipboard.writeText(text);
  setCopiedAddress(identifier);
  const notifId = addNotification(`${identifier} copied!`);
  setTimeout(() => removeNotification(notifId), NOTIFICATION_TTL);
  setTimeout(() => setCopiedAddress(null), 2000);
};

  return (
    <>
    <NextSeo
        title="Support☕| Buy Me a Coffee"
        description="Fuel my coding sessions with your support"
        canonical="https://byteprowler.vercel.app"
        openGraph={{
          url: "https://byteprowler.vercel.app",
          title: "Support My Work | ByteProwler",
          description: "Help me creating creating awesome content and projects",
          images: [
            {
              url: '/byteprowler.jpeg',
              width: 600,
              height: 600,
              alt: 'ByteProwler Portfolio'
            }
          ] 
        }} />

    <section
      className="min-h-screen py-20 px-4 text-white grid place-items-center"
    >
      {/* Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              id={notification.id}
              text={notification.text}
              removeNotif={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div 
          className="border border-white/20 bg-gradient-to-br from-white/5 to-black/30 p-6 rounded-xl shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2 text-center">Support My Grind ☕</h1>
          <p className="text-white/80 text-center">
            If you love what I do and want to support me, feel free to send a tip!
            Your support helps me stay motivated and keep building awesome projects.
          </p>
        </motion.div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          {/* Method Dropdown */}
          <div className="relative">
            <motion.button
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
              onClick={() => {
                setShowMethodDropdown(!showMethodDropdown);
                setShowBankDropdown(false);
                setShowCryptoDropdown(false);
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{selectedMethod || "Choose Payment Method"}</span>
              <motion.span
                animate={showMethodDropdown ? "open" : "closed"}
                variants={animationVariants.icon}
              >
                <IoIosArrowDown />
              </motion.span>
            </motion.button>
            
            <AnimatePresence>
              {showMethodDropdown && (
                <motion.ul
                  className="absolute z-10 w-full mt-1 rounded-lg border border-white/20 bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden"
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
                      onClick={() => {
                        setSelectedMethod(method);
                        setShowMethodDropdown(false);
                      }}
                    >
                      {method}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Bank Selection */}
          {selectedMethod === "Bank Transfer" && (
            <motion.div
              key="bank-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.button
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => {
                  setShowBankDropdown(!showBankDropdown);
                  setShowCryptoDropdown(false);
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{selectedBank || "Select Bank"}</span>
                <motion.span
                  animate={showBankDropdown ? "open" : "closed"}
                  variants={animationVariants.icon}
                  >
                  <IoIosArrowDown />
                </motion.span>
              </motion.button>
              
              <AnimatePresence mode="wait">
                {showBankDropdown && (
                  <motion.ul
                    className="absolute z-10 w-full mt-1 rounded-lg border border-white/20 bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden"
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
                        onClick={() => {
                          setSelectedBank(bank.name);
                          setShowBankDropdown(false);
                          setSelectedCrypto(null);
                          setShowCryptoDropdown(false);
                        }}
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

          {/* Crypto Selection */}
          {selectedMethod === "Crypto Payment" && (
            <motion.div
            key="crypto-details"
            initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.button
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => {
                  setShowCryptoDropdown(!showCryptoDropdown);
                  setShowBankDropdown(false);
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{selectedCrypto?.name || "Select Cryptocurrency"}</span>
                <motion.span
                  animate={showCryptoDropdown ? "open" : "closed"}
                  variants={animationVariants.icon}
                >
                  <IoIosArrowDown />
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {showCryptoDropdown && (
                  <motion.ul
                    className="absolute z-10 w-full mt-1 rounded-lg border border-white/20 bg-gray-900/95 backdrop-blur-sm shadow-lg overflow-hidden"
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
                        onClick={() => {
                          setSelectedCrypto(wallet);
                          setShowCryptoDropdown(false);
                          setSelectedBank(null);
                          setShowBankDropdown("")
                        }}
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

        {/* Bank Details Display */}
        {selectedBank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-white/20 bg-gradient-to-br from-white/5 to-black/30 p-4 rounded-lg shadow-lg backdrop-blur-sm"
            >
            <h3 className="font-medium mb-3 text-center">Bank Transfer Details</h3>
            <div className="space-y-2">
              <p className="text-white"><span className="text-white/70">Bank:</span> {selectedBank}</p>
              <p className="text-white"><span className="text-white/70">Account Name:</span> Ogo Joshua Agama</p>
              <div className="flex items-center justify-between gap-2">
              <p className="text-white flex-1"><span className="text-white/70">Account Number:</span> {banks.find(b => b.name === selectedBank)?.NUBAN}</p>
            <motion.button
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => copyToClipboard(
            banks.find(b => b.name === selectedBank)?.NUBAN,
            `${selectedBank} Account Number`
          )}
          variants={animationVariants.copyButton}
          initial="initial"
          whileTap="tapped"
          animate={copiedAddress === `${selectedBank} Account Number` ? "success" : "initial"}
          aria-label="Copy Account Number"
          >
          {copiedAddress === `${selectedBank} Account Number` ? (
            <FaCheck className="text-lg text-green-400" />
          ) : (
            <FaCopy className="text-lg hover:cursor-pointer" />
          )}
        </motion.button>
        </div>
          </div>
          </motion.div>
        )}

        {/* Crypto Details Display */}
        {selectedCrypto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-white/20 bg-gradient-to-br from-white/5 to-black/30 p-4 rounded-lg shadow-lg backdrop-blur-sm"
            >
            <h3 className="font-medium mb-3 text-center">{selectedCrypto.name} Wallet Address</h3>
            <div className="space-y-3">
              {selectedCrypto.networks.map((network, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-white/70 mb-1">
                    <span className="font-medium text-white">Network:</span> {network.network}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-white font-mono break-all flex-1">
                      {network.address}
                    </p>
                    <motion.button
                      className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                      onClick={() => copyToClipboard(network.address, network.network)}
                      variants={animationVariants.copyButton}
                      initial="initial"
                      whileTap="tapped"
                      animate={copiedAddress === network.network ? "success" : "initial"}
                      aria-label="Copy address"
                    >
                      {copiedAddress === network.network ? (
                        <FaCheck className="text-lg" />
                      ) : (
                        <FaCopy className="text-lg" />
                      )}
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
    </>
  );
}