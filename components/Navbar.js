'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Assistant', href: '/assistant' },
  { name: 'Report', href: '/report' },
  { name: 'Map', href: '/map' },
  { name: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 transition-all duration-300 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full transition-all duration-300 ${isScrolled
            ? 'bg-white/15 backdrop-blur-xl shadow-2xl border border-white/20 px-4 py-2.5 sm:px-6'
            : 'bg-white/10 backdrop-blur-lg shadow-lg border border-white/15 px-4 py-3 sm:px-6 lg:px-8'
          }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label="AIRES Homepage"
            className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              AIRES
            </span>
          </Link>

          <ul className="hidden items-center gap-1 text-sm font-medium text-neutral-200 lg:flex">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-neutral-200 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login">
            <button
              type="button"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Log in
            </button>
          </Link>
          <Link href="/signup">
            <button
              type="button"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition-all hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Sign up free
            </button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute right-3 left-3 top-20 z-50 mx-auto max-w-md rounded-3xl bg-neutral-900/90 p-4 shadow-2xl backdrop-blur-2xl ring-1 ring-white/20 lg:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-neutral-200 transition-colors hover:bg-white/15 hover:text-white active:bg-white/20"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-2 border-t border-white/15 pt-4 sm:grid-cols-2">
              <Link href="/login">
                <button
                  type="button"
                  className="w-full rounded-full bg-white/15 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25"
                >
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button
                  type="button"
                  className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
                >
                  Sign up free
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Navbar