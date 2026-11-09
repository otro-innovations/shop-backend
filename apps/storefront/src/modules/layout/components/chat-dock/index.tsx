"use client"

import { useState } from "react"

const ICON_WA =
  "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.04 20.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"
const ICON_MS =
  "M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.45 3.14 7.17.16.14.26.34.27.56l.05 1.64c.02.52.55.86 1.02.65l1.83-.81c.16-.07.35-.09.52-.04 1.01.28 2.08.43 3.17.43 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm5.87 13.09c-.24.68-1.4 1.3-1.93 1.34-.53.05-1.02.24-3.44-.72-2.91-1.15-4.75-4.12-4.89-4.31-.14-.19-1.16-1.55-1.16-2.96s.73-2.1 1-2.38c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.6.81 2.06.88 2.21.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.74 1.22 1.59 1.98.85.75 1.57 1.06 1.79 1.18.22.12.35.1.48-.06.14-.17.55-.65.7-.88.14-.23.29-.19.48-.12.19.07 1.22.58 1.43.69.21.11.35.17.4.26.05.09.05.54-.19 1.22z"

export default function ChatDock() {
  const [open, setOpen] = useState(false)

  const channels = [
    { label: "WhatsApp · Sheikh Social", href: "https://wa.me/sheikhsocial", icon: ICON_WA, cls: "bg-[#25D366]" },
    { label: "WhatsApp · Imran", href: "https://wa.me/ImranSheikh40900297", icon: ICON_WA, cls: "bg-[#25D366]" },
    { label: "Messenger", href: "http://m.me/otrobd", icon: ICON_MS, cls: "bg-[#0084FF]" },
  ]

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <div className={`flex flex-col items-end gap-2 transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        {channels.map((c) => (
          <a
            key={c.href}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-white pl-3 pr-4 py-2 text-xs font-semibold text-[var(--otro-ink)] shadow-lg ring-1 ring-black/5 hover:shadow-xl"
          >
            <span className={`${c.cls} flex h-7 w-7 items-center justify-center rounded-full`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white"><path d={c.icon} /></svg>
            </span>
            {c.label}
          </a>
        ))}
      </div>
      <button
        type="button"
        aria-label="Chat with us"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--otro-ink)] text-white shadow-xl ring-4 ring-white/60 transition hover:bg-[var(--otro-ink-soft)]"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white"><path d={ICON_WA} /></svg>
        )}
      </button>
    </div>
  )
}