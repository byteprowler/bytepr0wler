import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCopy, FaBitcoin, FaEthereum } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { SiPinetwork, SiSolana } from "react-icons/si";

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
      icon: <SiSolana className="text-yellow-500" />, 
      networks: [{ network: "SOL", address: "9H3WYyqTtryoP49hW52cpJE7PArtEk4Uz4SSt6wcW2pk" }],
    },
    {
      name: "USDT",
      icon: <SiPinetwork className="text-yellow-500" />, 
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

      {/* METHOD SELECTOR */}
      <div className="relative mt-6 mb-4 max-w-xl mx-auto">
        <button
          onClick={() => setShowMethodDropdown(!showMethodDropdown)}
          className="border text-gray-400 px-4 py-3 rounded-lg w-full text-left"
        >
          {selectedMethod ? selectedMethod : "Choose Payment Method"}
        </button>
        {showMethodDropdown && (
          <ul className="absolute z-10 bg-white w-full rounded mt-1 shadow text-gray-800">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedMethod("Bank Transfer");
                setShowMethodDropdown(false);
                setSelectedBank(""); // reset bank when method changes
              }}
            >
              💸 Bank Transfer
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedMethod("Crypto Payment");
                setShowMethodDropdown(false);
              }}
            >
              🪙 Crypto Payment
            </li>
          </ul>
        )}
      </div>

      {/* BANK DROPDOWN (only if Bank Transfer is selected) */}
      {selectedMethod === "Bank Transfer" && (
        <div className="relative mb-4 max-w-xl mx-auto">
          <button
            onClick={() => setShowBankDropdown(!showBankDropdown)}
            className="border text-white px-4 py-3 rounded-lg w-full text-left"
          >
            {selectedBank ? selectedBank : "Choose Bank"}
          </button>
          {showBankDropdown && (
            <ul className="absolute z-10 w-full rounded mt-1 shadow text-white border">
              {banks.map((bank, idx) => (
                <li
                  key={idx}
                  className="px-4 flex py-2 hover:bg-gray-100 cursor-pointer items-center space-between"
                  onClick={() => {
                    setSelectedBank(bank.name);
                    setShowBankDropdown(false);
                  }}
                >
                  {bank.icon} {bank.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Crypto DROPDOWN (only if Bank Transfer is selected) */}
      {selectedMethod === "Crypto Payment" && (
        <div className="relative mb-4 max-w-xl mx-auto text-white border rounded-2xl">
          <button
            onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
            className="text-white px-4 py-3 rounded-lg text-left"
          >
            {selectedNetwork ? selectedNetwork : "Choose Coin"}
          </button>
          {showCryptoDropdown && (
            <ul className="absolute z-10 w-full rounded mt-1 shadow text-white">
              {wallets.map((wallet, idx) => (
                <li
                  key={idx}
                  className="px-4 flex py-2 space-y-2 hover:border cursor-pointer"
                  onClick={() => {
                    setSelectedCrypto(wallet);
                    setSelectedNetwork(wallet.name);
                    setShowCryptoDropdown(false);
                  }}
                >
                  {wallet.icon} {wallet.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
        <div className="border p-4 rounded shadow max-w-xl mx-auto">
          <p className="text-gray-400"><strong>Coin:</strong> {selectedCrypto.name}</p>
          {selectedCrypto.networks.map((net, i) => (
            <div key={i}>
            <p className="text-gray-400"><strong>Network:</strong> {net.network}</p>
            <p className="flex items-center gap-2">
            <span className="break-all text-gray-400">{net.address}</span>
            <FaCopy
            className="cursor-pointer text-gray-400"
            onClick={() => navigator.clipboard.writeText(net.address)}
            />
        </p>
        </div>
    ))}
  </div>
)}
    </motion.section>
  );
}