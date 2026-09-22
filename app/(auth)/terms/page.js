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
                            Terms &amp; Conditions
                        </h1>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            By using our Smart City &amp; Emergency Response Platform, you agree to use the
                            service responsibly and provide accurate information when reporting emergencies.
                            Users must not submit false reports, misuse the platform, or engage in unlawful
                            activities.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            The platform provides community-based incident reporting and AI-assisted
                            information for public awareness. It does not replace official emergency services,
                            and users should contact the appropriate authorities during emergencies.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            Location information may be used to display nearby incidents and improve platform
                            functionality. Users are responsible for ensuring that the information they submit
                            is accurate.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed text-white/70">
                            We do not guarantee uninterrupted service or the accuracy of every report. We may
                            update these Terms &amp; Conditions as the platform develops.
                        </p>

                        <p className="text-sm sm:text-base leading-relaxed text-white/90 font-medium">
                            By registering or using the platform, you acknowledge these terms and agree to
                            comply with them.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Terms