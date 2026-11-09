"use client"

import { useState } from "react"
import { sdk } from "@lib/config"

export default function GoogleButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const callbackUrl = window.location.origin + window.location.pathname
      const res = (await sdk.auth.login("customer", "google", { callbackUrl })) as {
        location?: string
      }
      if (res?.location) {
        window.location.href = res.location
      } else {
        setError("Could not start Google sign-in.")
        setLoading(false)
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Google sign-in failed."
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--otro-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--otro-ink)] transition hover:bg-[var(--otro-cream)] disabled:opacity-60"
      >
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C36.9 40 44 35 44 24c0-1.3-.1-2.3-.4-3.5z" />
        </svg>
        {loading ? "Redirecting…" : "Continue with Google"}
      </button>
      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </div>
  )
}