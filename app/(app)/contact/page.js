"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "willaddlater";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative flex-1 w-full bg-neutral-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-10 z-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 z-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <section className="relative z-10 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-2xl">
          <div className="rounded-3xl border border-white/15 bg-neutral-900/60 p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl sm:p-8 md:p-10">
            <div className="animate-fade-in-up text-center">
              <p className="mb-2 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-300">
                Contact Us
              </p>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                Let's get in
                <span className="block text-white">
                  touch.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base sm:leading-7">
                Have a question, found a bug, or just want to say hi? Drop us
                a message and we'll get back to you soon.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="animate-fade-in-up mt-8 space-y-5"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-neutral-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white shadow-sm outline-none transition-all duration-300 placeholder:text-neutral-500 focus:border-white/50 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-neutral-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white shadow-sm outline-none transition-all duration-300 placeholder:text-neutral-500 focus:border-white/50 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-neutral-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white shadow-sm outline-none transition-all duration-300 placeholder:text-neutral-500 focus:border-white/50 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:text-base"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="animate-fade-in-up rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-medium text-white backdrop-blur-md">
                  Thanks! Your message has been sent.
                </p>
              )}

              {status === "error" && (
                <p className="animate-fade-in-up rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-medium text-neutral-200 backdrop-blur-md">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}