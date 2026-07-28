import Link from "next/link";
import { NextSeo } from "next-seo";
import { FiArrowUpRight, FiLock } from "react-icons/fi";

export default function BuyMeACoffeePage() {
  return (
    <>
      <NextSeo
        title="Payment Uplink Offline | ByteProwler"
        description="ByteProwler payment/support channel is currently offline. Contact me for work, collaboration, and project inquiries."
        canonical="https://byteprowler.vercel.app/buymeacoffee"
        noindex
      />

      <section className="min-h-screen px-4 py-24 text-white grid place-items-center">
        <div className="w-full max-w-xl border border-neon-purple/20 bg-black/70 p-6 rounded-sm font-mono shadow-glow-purple/5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-5">
            <span className="text-[10px] text-neon-purple font-black uppercase tracking-widest">
              [ PAYMENT_UPLINK_DISABLED ]
            </span>
            <FiLock className="h-4 w-4 text-neon-purple" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
            Support Channel Offline
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Payment and support flows are intentionally commented out while Byteprowler focuses on work inquiries, collaboration, and production-ready project delivery.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2 text-[10px] uppercase tracking-wider">
            <div className="flex justify-between border-b border-white/5 py-2">
              <span className="text-gray-500">SUPPORT_CHANNEL:</span>
              <span className="text-neon-purple font-black">OFFLINE</span>
            </div>
            <div className="flex justify-between border-b border-white/5 py-2">
              <span className="text-gray-500">PAYMENT_UPLINK:</span>
              <span className="text-neon-blue font-black">COMMENTED_OUT</span>
            </div>
            <div className="flex justify-between border-b border-white/5 py-2">
              <span className="text-gray-500">WORK_CHANNEL:</span>
              <span className="text-neon-green font-black">ACTIVE</span>
            </div>
          </div>

          {/* Re-enable later: replace this offline panel with Flutterwave setup after payment copy/config is ready. */}
          {/* Do not add bank, wallet, or payment copy details until the live payment flow is intentionally reviewed. */}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-neon-lime/90 px-4 py-3 text-xs font-black uppercase text-black transition hover:bg-neon-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              Contact Me
              <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs font-black uppercase text-white transition hover:border-neon-lime/40 hover:text-neon-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
