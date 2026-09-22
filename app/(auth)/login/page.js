'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import GhostFibers from '@/components/GhostFibers'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s-]{7,15}$/

const Login = () => {
  const [method, setMethod] = useState('email')
  const [values, setValues] = useState({ contact: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const update = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.contact.trim()) {
      next.contact = method === 'email' ? 'Enter your email address.' : 'Enter your phone number.'
    } else if (method === 'email' && !EMAIL_RE.test(values.contact)) {
      next.contact = 'Enter a valid email address.'
    } else if (method === 'phone' && !PHONE_RE.test(values.contact)) {
      next.contact = 'Enter a valid phone number.'
    }
    if (!values.password) next.password = 'Enter your password.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      // TODO: replace with your real auth call
      // await signIn('credentials', { identifier: values.contact, password: values.password, method })
      await new Promise((resolve) => setTimeout(resolve, 900))
    } catch (err) {
      setFormError("We couldn't log you in. Check your details and try again.")
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
          <h1 className="text-2xl font-semibold text-white">Log in</h1>
          <p className="mt-1 text-sm text-white/60">Welcome back — enter your details to continue.</p>

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
                onClick={() => setMethod('email')}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  method === 'email' ? 'text-white' : 'text-white/50'
                }`}
              >
                <MailIcon className="h-4 w-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('phone')}
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
                  errors.contact ? 'border-red-400/70' : 'border-white/10'
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
                  value={values.contact}
                  onChange={update('contact')}
                  placeholder={method === 'email' ? 'you@example.com' : '+91 12345 00000'}
                  aria-invalid={!!errors.contact}
                  className="w-full bg-transparent py-3 text-sm text-white placeholder-white/30 outline-none"
                />
              </div>
              {errors.contact && <p role="alert" className="text-xs text-red-400">{errors.contact}</p>}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <div
                className={`flex items-center gap-2.5 rounded-xl border bg-white/4 px-3.5 transition-colors focus-within:border-indigo-400 focus-within:bg-white/[0.07] ${
                  errors.password ? 'border-red-400/70' : 'border-white/10'
                }`}
              >
                <LockIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={values.password}
                  onChange={update('password')}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  className="w-full bg-transparent py-3 text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="shrink-0 text-white/40 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOffIcon className="h-[18px] w-[18px]" /> : <EyeIcon className="h-[18px] w-[18px]" />}
                </button>
              </div>
              {errors.password && <p role="alert" className="text-xs text-red-400">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-white/60">
                <input
                  type="checkbox"
                  checked={values.remember}
                  onChange={update('remember')}
                  className="h-4 w-4 rounded accent-indigo-400"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-medium text-white/80 underline decoration-indigo-400 underline-offset-4 hover:text-white">
                Forgot password?
              </Link>
            </div>

            {formError && <p role="alert" className="text-xs text-red-400">{formError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(99,102,241,0.8)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? <SpinnerIcon className="h-[18px] w-[18px] animate-spin" /> : 'Log in'}
            </button>

            <div className="flex items-center gap-3 text-xs text-white/30">
              <span className="h-px flex-1 bg-white/10" />
              or
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={() => {
                // TODO: wire up real Google OAuth, e.g. NextAuth's signIn('google')
                console.warn('Google auth is not connected yet.')
              }}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/9"
            >
              <GoogleIcon className="h-[18px] w-[18px]" />
              Continue with Google
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-white/60">
            New here?{' '}
            <Link href="/signup" className="font-semibold text-white underline decoration-indigo-400 underline-offset-4 hover:text-indigo-300">
              Create an account
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

function LockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  )
}

function EyeOffIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.7c.5-.1 1-.2 1.4-.2 6 0 9.5 6.5 9.5 6.5a13.6 13.6 0 0 1-3.2 3.9M6.7 6.7A13.8 13.8 0 0 0 2.5 12S6 18.5 12 18.5c1.3 0 2.5-.3 3.5-.7" />
      <path d="M9.9 9.9a2.8 2.8 0 0 0 3.9 3.9" />
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

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.4l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
    </svg>
  )
}

export default Login