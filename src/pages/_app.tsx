import React, { useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import BootSequence from "../components/ui/BootSequence";

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <BootSequence enabled={router.pathname === "/"} />
      <div className="min-h-screen bg-obsidian text-gray-100 selection:bg-neon-lime selection:text-black font-sans relative antialiased overflow-x-hidden">
        {/* Interactive Cyberpunk Overlay Grid */}
        <div className="absolute inset-0 terminal-grid pointer-events-none z-0"></div>
        <div className="absolute inset-0 terminal-dots pointer-events-none z-0"></div>

        {/* Subtle scanline overlay to complete the retro high-tech theme */}
        <div className="scanline-overlay"></div>

        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
          <Component {...pageProps} />
        </div>
      </div>
    </QueryClientProvider>
  );
}