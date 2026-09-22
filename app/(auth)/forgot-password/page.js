'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import GhostFibers from '@/components/GhostFibers'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s-]{7,15}$/

const ForgotPassword = () => {
  const [method, setMethod] = useState('email')
  const [contact, setContact] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = () => {
    if (!contact.trim()) {
      setError(method === 'email' ? 'Enter your email address.' : 'Enter your phone number.')
      return false
    }
    if (method === 'email' && !EMAIL_RE.test(contact)) {
      setError('Enter a valid email address.')
      return false
    }
    if (method === 'phone' && !PHONE_RE.test(contact)) {
      setError('Enter a valid phone number.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      // TODO: replace with your real request, e.g.
      // await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ contact, method }) })
      await new Promise((resolve) => setTimeout(resolve, 900))
      setSent(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
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

      <section className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/6 backdrop-blur-2xl shadow-[0_30px_80px_-25px_rgba(52,55,160,0.6)] p-8 sm:p-10">
          {!sent ? (
            <>
              <h1 className="text-2xl font-semibold text-white">Reset your password</h1>
              <p className="mt-1 text-sm text-white/60">
                Enter the email or phone number on your account and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
                {/* Email / phone toggle */}
                <div className="relative grid grid-cols-2 rounded-xl border border-white/10 bg-white/4 p-1">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg border border-white/10 bg-white/10 transition-transform duration-300 ease-out"
                    style={{ transform: method === 'phone' ? 'translateX(100%)' : 'translateX(0)' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMethod('email')
                      setError('')
                    }}
                    className={`relative z-10 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                      method === 'email' ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    <MailIcon className="h-4 w-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMethod('phone')
                      setError('')
                    }}
                    className={`relative z-10 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                      method === 'phone' ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Phone
                  </button>
                </div>

                {/* Contact field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact" className="text-sm font-medium text-white">
                    {method === 'email' ? 'Email address' : 'Phone number'}
                  </label>
                  <div
                    className={`flex items-center gap-2.5 rounded-xl border bg-white/4 px-3.5 transition-colors focus-within:border-indigo-400 focus-within:bg-white/[0.07] ${
                      error ? 'border-red-400/70' : 'border-white/10'
                    }`}
                  >
                    {method === 'email' ? (
                      <MailIcon className="h-4 w-4 shrink-0 text-white/40" />
                    ) : (
                      <PhoneIcon className="h-4 w-4 shrink-0 text-white/40" />
                    )}
                    <input
                      id="contact"
                      name="contact"
                      type={method === 'email' ? 'email' : 'tel'}
                      inputMode={method === 'email' ? 'email' : 'tel'}
                      autoComplete={method === 'email' ? 'email' : 'tel'}
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value)
                        setError('')
                      }}
                      placeholder={method === 'email' ? 'you@example.com' : '+1 555 000 1234'}
                      aria-invalid={!!error}
                      className="w-full bg-transparent py-3 text-sm text-white placeholder-white/30 outline-none"
                    />
                  </div>
                  {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(99,102,241,0.8)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {submitting ? <SpinnerIcon className="h-[18px] w-[18px] animate-spin" /> : 'Send reset link'}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                <CheckIcon className="h-6 w-6 text-emerald-400" />
              </div>
              <h1 className="mt-5 text-2xl font-semibold text-white">Check {method === 'email' ? 'your inbox' : 'your phone'}</h1>
              <p className="mt-2 text-sm text-white/60">
                {method === 'email'
                  ? <>We sent a reset link to <span className="text-white">{contact}</span>. It expires in 15 minutes.</>
                  : <>We sent a reset code to <span className="text-white">{contact}</span>. It expires in 15 minutes.</>}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false)
                  setSubmitting(false)
                }}
                className="mt-6 text-sm font-medium text-white/70 underline decoration-indigo-400 underline-offset-4 hover:text-white"
              >
                Didn&apos;t get anything? Try again
              </button>
            </div>
          )}

          <p className="mt-7 text-center text-sm text-white/60">
            Remembered your password?{' '}
            <Link href="/login" className="font-semibold text-white underline decoration-indigo-400 underline-offset-4 hover:text-indigo-300">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4.1c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1z" />
    </svg>
  )
}

function SpinnerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m4 12 5.5 5.5L20 6" />
    </svg>
  )
}

export default ForgotPassword