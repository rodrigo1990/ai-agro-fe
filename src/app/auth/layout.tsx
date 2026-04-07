import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative h-full w-full">
              <video
                  className="absolute top-0 left-0 w-full h-dvh object-cover"
                  src="/videos/aereal.mp4"   // put your video in /public/videos/
                  autoPlay
                  loop
                  muted
                  playsInline
              />

              {/* Dark overlay for readability */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                <h1 className="text-5xl font-bold tracking-wide">
                  AI-AGRO
                </h1>
                <p className="mt-4 text-lg text-gray-200 max-w-xl">
                  Agricultura inteligente, impulsada por datos inteligentes
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
