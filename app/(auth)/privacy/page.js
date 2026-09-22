'use client'
import React from 'react'
import Lightfall from '@/components/Lightfall'

const Terms = () => {
    return (
        <>
            <div className="fixed inset-0 h-screen w-screen overflow-hidden">
                <Lightfall
                    colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
                    backgroundColor="#0A29FF"
                    speed={0.5}
                    streakCount={2}
                    streakWidth={1}
                    streakLength={1}
                    glow={1}
                    density={0.6}
                    twinkle={1}
                    zoom={3}
                    backgroundGlow={0.5}
                    opacity={1}
                    mouseInteraction
                    mouseStrength={0.5}
                    mouseRadius={1}
                    color1="#A6C8FF"
                    color2="#5227FF"
                    color3="#FF9FFC"
                />
            </div>

            <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
                <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[0_30px_80px_-25px_rgba(82,39,255,0.5)] p-6 sm:p-10 md:p-12">
                    <div className="flex flex-col items-center text-center gap-6 sm:gap-7">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                            Privacy Policy
                        </h1>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            Our Smart City & Emergency Response Platform respects your privacy. We may collect basic account information, incident reports, and location details to provide emergency alerts and display nearby incidents. Your information will be handled responsibly and protected using appropriate security measures.

                        </p>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            Location access is used only for relevant platform features, and users may manage location permissions through their device or browser settings. Information submitted in public incident reports may be visible to other users. Data provided to the AI Emergency Assistant may be processed to generate responses.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            We do not guarantee absolute data security. By using our platform, you acknowledge this Privacy Policy and agree to its terms.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Terms