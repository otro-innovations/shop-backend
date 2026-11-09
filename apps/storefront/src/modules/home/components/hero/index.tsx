import LocalizedClientLink from "@modules/common/components/localized-client-link"

const points = [
  { k: "Worldwide", v: "Ship to 190+ countries" },
  { k: "Trusted", v: "US-registered LLC" },
  { k: "Human", v: "WhatsApp support" },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--otro-cream)]">
      <div className="absolute inset-0 -z-0" aria-hidden>
        <div className="absolute right-[-6%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[var(--otro-gold-soft)] opacity-40 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-30%] h-[420px] w-[420px] rounded-full bg-[#cfe0d3] opacity-40 blur-3xl" />
      </div>
      <div className="otro-container relative z-10 grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="otro-eyebrow">OTRO · Business Beyond Borders</span>
          <h1 className="otro-heading mt-4 text-4xl sm:text-5xl lg:text-6xl">
            Global products,
            <br />
            <span className="text-[var(--otro-gold)]">delivered to your door.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--otro-muted)]">
            Curated finds from Bangladesh, China, Sweden and beyond — with transparent pricing,
            honest shipping, and real humans on WhatsApp. One store, the whole world.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LocalizedClientLink href="/store" className="otro-btn">
              Shop all products
            </LocalizedClientLink>
            <LocalizedClientLink href="/collections/swedish-corner" className="otro-btn-ghost">
              Swedish Corner
            </LocalizedClientLink>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--otro-line)] pt-6">
            {points.map((p) => (
              <div key={p.k}>
                <dt className="text-sm font-bold text-[var(--otro-ink)]">{p.k}</dt>
                <dd className="mt-1 text-[11px] leading-snug text-[var(--otro-muted)]">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#0b1b2b] to-[#27405c] p-5 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--otro-gold)]">Swedish Corner</span>
              <p className="mt-3 text-lg font-semibold leading-snug">Brands &amp; goods from Sweden, shipped via DHL &amp; FedEx.</p>
              <LocalizedClientLink href="/collections/swedish-corner" className="mt-4 inline-block text-xs font-semibold text-[var(--otro-gold)] hover:underline">
                Discover →
              </LocalizedClientLink>
            </div>
            <div className="aspect-[4/5] rounded-2xl bg-white p-5 ring-1 ring-[var(--otro-line)]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--otro-gold)]">Bangladesh</span>
              <p className="mt-3 text-lg font-semibold leading-snug text-[var(--otro-ink)]">Local favourites, bKash &amp; COD friendly.</p>
              <LocalizedClientLink href="/store" className="mt-4 inline-block text-xs font-semibold text-[var(--otro-ink)] hover:underline">
                Shop local →
              </LocalizedClientLink>
            </div>
            <div className="col-span-2 rounded-2xl bg-white p-5 ring-1 ring-[var(--otro-line)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--otro-ink)]">Prices exclude shipping — shown clearly at checkout.</p>
                <span className="rounded-full bg-[var(--otro-cream)] px-3 py-1 text-[10px] font-semibold text-[var(--otro-muted)]">No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}