"use client"

import { useParams, usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { HttpTypes } from "@medusajs/types"

import { updateRegion } from "@lib/data/cart"

const LANGS: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "bn", label: "বাংলা" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "hi", label: "हिन्दी" },
  { code: "ur", label: "اردو" },
]

type Option = { country: string; region: string; label: string }

export default function TopBar({ regions }: { regions: HttpTypes.StoreRegion[] }) {
  const { countryCode } = useParams() as { countryCode?: string }
  const pathname = usePathname()
  const [lang, setLang] = useState("en")

  const options = useMemo<Option[]>(
    () =>
      (regions || [])
        .flatMap((r) =>
          (r.countries || []).map((c) => ({
            country: c.iso_2 ?? "",
            region: r.id,
            label: c.display_name ?? c.iso_2 ?? "",
          }))
        )
        .filter((o) => o.country)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [regions]
  )

  // Inject the free Google Translate widget (interim multi-language; native
  // EN/BN/AR/FR strings ship in a later phase).
  useEffect(() => {
    const w = window as unknown as { googleTranslateElementInit?: () => void; google?: any }
    w.googleTranslateElementInit = () => {
      const g = w.google as any
      if (g?.translate?.TranslateElement) {
        new g.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGS.map((l) => l.code).join(","),
            autoDisplay: false,
          },
          "google_translate_element"
        )
      }
    }
    if (!document.getElementById("gt-script")) {
      const s = document.createElement("script")
      s.id = "gt-script"
      s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      s.async = true
      document.body.appendChild(s)
    }
  }, [])

  const handleCountry = (country: string) => {
    const rest = countryCode ? pathname.split(`/${countryCode}`)[1] || "" : pathname
    updateRegion(country, rest)
  }

  const handleLang = (code: string) => {
    setLang(code)
    const base = "en"
    const value = code === "en" ? "/auto/en" : `/auto/${code}`
    document.cookie = `googtrans=${value};path=/`
    document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`
    void base
    window.location.reload()
  }

  return (
    <div className="bg-[var(--otro-ink)] text-white/85">
      <div className="otro-container flex h-9 items-center justify-between text-[11px]">
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-white/60">Worldwide delivery · USD / local currency</span>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          {/* Country */}
          <label className="flex items-center gap-1.5">
            <span className="text-white/50">Ship to</span>
            <select
              aria-label="Select country"
              className="otro-select text-white"
              value={countryCode ?? options[0]?.country ?? ""}
              onChange={(e) => handleCountry(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.country} value={o.country} className="text-[#0B1B2B]">
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          {/* Language */}
          <div className="flex items-center gap-1.5">
            <span className="text-white/50">Language</span>
            <div id="google_translate_element" className="[&_*]:!text-white" />
            <select
              aria-label="Select language"
              className="otro-select text-white"
              value={lang}
              onChange={(e) => handleLang(e.target.value)}
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code} className="text-[#0B1B2B]">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contact */}
          <a
            href="https://wa.me/sheikhsocial"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline text-white/70 hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href="http://m.me/otrobd"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline text-white/70 hover:text-white"
          >
            Messenger
          </a>
        </div>
      </div>
    </div>
  )
}