import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCopy, FaBitcoin, FaEthereum } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { SiPinetwork, SiSolana, SiTether } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";

const COLORS_TOP = ["#f0f0f0", "#00000", "#d310", "#f15090"];

const wallets = [
    {
      name: "Bitcoin",
      icon: <FaBitcoin className="text-orange-500" />, 
      networks: [{ network: "Mainnet", address: "bc1qy3nmk8uauha969qk953g2z9teqcxktl7aqk95z" }],
    },
    {
      name: "Ethereum",
      icon: <FaEthereum className="text-purple-500" />, 
      networks: [
        { network: "ERC-20", address: "0x679BAd07Ea83253D25373f69963cf61f458800cb" },
        { network: "BEP-20", address: "0x1f5424b0f838e3fbb61edeba5fd0f39b8c5eae46" },
      ],
    },
    {
      name: "Pi Network",
      icon: <SiPinetwork className="text-yellow-500" />, 
      networks: [{ network: "Pi Network", address: "MDFNWH6ZFJVHJDLBMNOUT35X4EEKQVJAO3ZDL4NL7VQJLC4PJOQFWAAAAABC4YPK734CE" }],
    },
    {
      name: "Solana",
      icon: <SiSolana className="text-purple-500" />, 
      networks: [{ network: "SOL", address: "9H3WYyqTtryoP49hW52cpJE7PArtEk4Uz4SSt6wcW2pk" }],
    },
    {
      name: "USDT",
      icon: <SiTether className="text-green-600" />, 
      networks: [{ network: "BEP-20", address: "0x1f5424b0f838e3fbb61edeba5fd0f39b8c5eae46" }],
    },
];


const banks = [
  {
    name: "Guaranty Trust Bank",
    icon: <BsBank className="text-blue-500" />,
    NUBAN: "0123456789",
    accountName: "Joshua Agama Ogo",
  },
  {
    name: "Kuda MFB",
    icon: <BsBank className="text-pink-500" />,
    NUBAN: "0812345678",
    accountName: "Joshua Agama Ogo",
  },
  {
    name: "Globus Bank",
    icon: <BsBank className="text-green-500" />,
    NUBAN: "0912345678",
    accountName: "Joshua Agama Ogo",
  },
];

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 360 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};

export default function Index() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState("");

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
    <motion.section
      style={{ backgroundImage }}
      className="py-40 px-4 text-white place-content-center min-h-screen"
    >
      <div className="border items-center justify-center max-w-xl mx-auto p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Support My Work ☕
        </h1>
        <p className="text-white">
          If you love what I do and want to support me, feel free to send a small tip! Your support helps me stay motivated and keep building awesome projects. Thanks in advance! 🚀
        </p>
      </div>

{/* Payment Method Dropdown */}
<motion.div className="mb-4 p-2 max-w-xl mx-auto">
  <motion.button
    onClick={() => setShowMethodDropdown(!showMethodDropdown)}
    variants={actionIconVariants}
    initial="closed"
    animate="open"
    whileTap="tap"
    className="border px-4 py-3 flex justify-between rounded-lg w-full text-left text-white"
  >
    {selectedMethod || "Choose Payment Method"}
  <motion.span className="md:flex hidden" variants={iconVariants}>
    <IoIosArrowDown />
  </motion.span>
  </motion.button>
  <AnimatePresence>
    {showMethodDropdown && (
      <motion.ul
        className="mt-2 w-full bg-transparent border rounded-md text-white shadow relative z-50"
        variants={wrapperVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {["Bank Transfer", "Crypto Payment"].map((method, i) => (
          <motion.li
            key={method}
            className="px-4 py-2 hover:border-b-2 rounded-md transition cursor-pointer"
            variants={itemVariants}
            custom={i}
            onClick={() => {
              setSelectedMethod(method);
              setShowMethodDropdown(false);
              setSelectedBank("");
              setSelectedCrypto(null);
              setSelectedNetwork("");
            }}
          >
            {method}
          </motion.li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
</motion.div>


{/* BANK DROPDOWN (only if Bank Transfer is selected) */}
<motion.div>
      {selectedMethod === "Bank Transfer" && (
        <div className="relative mb-4 max-w-xl mx-auto">
          <motion.button
            onClick={() => setShowBankDropdown(!showBankDropdown)}
            initial="closed"
            animate="open"
            whileTap="tap"
            variant={actionIconVariants}
            className="border text-white px-4 py-3 rounded-lg w-full text-left"
          >
            {selectedBank || "Choose Bank"}
          </motion.button>
  <AnimatePresence>
    {showBankDropdown && (
      <motion.ul 
      variants={wrapperVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="absolute z-10 w-full rounded mt-1 shadow text-white border">
        {banks.map((bank, idx) => (
          <motion.li
            key={idx}
            variants={itemVariants}
            className="px-4 flex py-2 hover:border-b-2 cursor-pointer items-center space-between"
            onClick={() => {
              setSelectedBank(bank.name);
              setShowBankDropdown(false);
              setSelectedCrypto(null);
              setSelectedNetwork("")
        }}
      >
        <span className="mr-2">{bank.icon}</span> {bank.name}
      </motion.li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
        </div>
      )}
</motion.div>
      {/* Crypto DROPDOWN (only if Bank Transfer is selected) */}
<motion.div>
      {selectedMethod === "Crypto Payment" && (
        <div className="relative max-w-xl mb-4 mx-auto">
          <motion.button
          initial="closed"
          animate="open"
          variants={actionIconVariants}
            onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
            className="text-white border px-4 py-3 rounded-lg w-full text-left"
          >
            {selectedNetwork ? selectedNetwork : "Choose Coin"}
          </motion.button>
<AnimatePresence>
          {showCryptoDropdown && (
            <motion.ul 
            variants={wrapperVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="relative z-10 w-full rounded mt-1 shadow text-white">
              {wallets.map((wallet, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="px-4 flex py-2 space-between items-center hover:border-b-2 cursor-pointer"
                  onClick={() => {
                    setSelectedCrypto(wallet);
                    setSelectedNetwork(wallet.name);
                    setShowCryptoDropdown(false);
                    setSelectedBank(false)
                    setSelectedNetwork("")
                  }}
                >
                  <span className="mr-2 items-center">{wallet.icon}</span> <span>{wallet.name}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
  </AnimatePresence>
        </div>
      )}
</motion.div>

      {/* Optional: Display bank details if selected */}
      {selectedBank && (
        <div className="text-white border p-4 rounded shadow max-w-xl mx-auto">
          <p><strong>Bank:</strong> {selectedBank}</p>
          <p><strong>Network:</strong> Joshua Agama Ogo</p>
          <p><strong>Account Number:</strong> {banks.find(b => b.name === selectedBank)?.NUBAN}</p>
        </div>
      )}
      {/* Optional: Display crypto details if selected */}
        {selectedCrypto && (
        <div className="border p-4 rounded shadow max-w-xl mx-auto mt-4 space-y-2">
          <p className="text-gray-300"><strong>Coin:</strong> {selectedCrypto.name}</p>
          {selectedCrypto.networks.map((network, index) => (
            <div
              key={index}
              className="border text-white border-gray-600 p-3 rounded-lg bg-gray-800 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-400"><strong>Network:</strong> {network.network}</p>
                <p className="text-sm break-words text-gray-400"><strong>Address:</strong> {network.address}</p>
              </div>
              <button
                className="text-sm mt-2 sm:mt-0 sm:ml-4 mx-auto hover:text-green-400 transition"
                onClick={() => {
                  navigator.clipboard.writeText(network.address);
                }}
              >
                <FaCopy className="inline-block mr-1" /> Copy
              </button>
            </div>
          ))}
        </div>
      )}

    </motion.section>
  );
}