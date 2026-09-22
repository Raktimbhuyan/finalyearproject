'use client'
import GhostFibers from "@/components/GhostFibers";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="fixed inset-0 h-screen w-screen overflow-hidden">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          twist={0.1}
          twistFrequency={5}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
          lightMode={false}
          fps={60}
          paused={false}
        />
      </div>
      <section className="relative w-full overflow-hidden text-white min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 xl:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Community Driven Platform
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1]">
              AI-Integrated City <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Safety Emergency Management System
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-md sm:max-w-xl lg:max-w-lg font-normal leading-relaxed">
              <span className="font-bold text-2xl">AIRES</span> is an AI-powered smart city app for real-time emergency reporting, nearby alerts, and incident tracking to help build safer communities.
            </p>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/dashboard">
                <button className="w-full sm:w-auto min-h-12 px-6 sm:px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-6 lg:mt-0">
            <div className="absolute -inset-2 sm:-inset-4 bg-linear-to-tr from-indigo-500/30 via-purple-500/20 to-pink-500/10 rounded-3xl blur-2xl sm:blur-3xl opacity-80 pointer-events-none" />
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none animate-float rounded-2xl border border-white/15 bg-slate-900/40 p-2.5 sm:p-4 backdrop-blur-xl shadow-2xl">
              <img
                src="/landingpage.jpeg"
                alt="Dashboard Preview"
                className="w-full h-auto aspect-4/3 sm:aspect-16/10 object-cover rounded-xl shadow-md"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}