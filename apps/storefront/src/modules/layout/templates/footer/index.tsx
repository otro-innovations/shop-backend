import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/otrobd", icon: "M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8zm4.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0zM20.5 8.9c-.1-2.4-.7-4.5-2.4-6.2-1.7-1.7-3.8-2.3-6.2-2.4C9.4.2 8 .2 6.2.2 4.4.3 3 .3 1.6 1.2.8 1.7.3 2.4 0 3.3 -.2 4.5-.1 5.8 0 7.1v9.8c.1 1.3 0 2.6.5 3.8.5.9 1.2 1.6 2.1 2.1 1.2.5 2.5.4 3.8.5h9.8c1.3-.1 2.6 0 3.8-.5.9-.5 1.6-1.2 2.1-2.1.5-1.2.4-2.5.5-3.8v-8zM18 18.2c-.2.5-.5 1-.9 1.4-.4.4-.9.7-1.4.9-1 .4-3.4.3-4.5.3H9c-1.1 0-3.5.1-4.5-.3-.5-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.4-1-.3-3.4-.3-4.5V9c0-1.1-.1-3.5.3-4.5.2-.5.5-1 .9-1.4.4-.4.9-.7 1.4-.9 1-.4 3.4-.3 4.5-.3h2.5c1.1 0 3.5-.1 4.5.3.5.2 1 .5 1.4.9.4.4.7.9.9 1.4.4 1 .3 3.4.3 4.5v2.5c0 1.1.1 3.5-.3 4.5z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/14544269/", icon: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" },
  { label: "WhatsApp", href: "https://wa.me/sheikhsocial", icon: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02zM12.04 20.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.53-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" },
  { label: "Messenger", href: "http://m.me/otrobd", icon: "M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.45 3.14 7.17.16.14.26.34.27.56l.05 1.64c.02.52.55.86 1.02.65l1.83-.81c.16-.07.35-.09.52-.04 1.01.28 2.08.43 3.17.43 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1 12.3l-2.5-2.66-4.87 2.66 5.36-5.69 2.56 2.66 4.81-2.66L12.4 14.3z" },
]

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  const topCats = (productCategories || []).filter((c) => !c.parent_category_id)

  return (
    <footer className="mt-16 border-t border-[var(--otro-line)] bg-[var(--otro-ink)] text-white/70">
      <div className="otro-container py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] font-extrabold tracking-[-0.04em] text-white">OTRO</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--otro-gold)]">Shop</span>
            </div>
            <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-white/55">
              Global products, delivered. A division of OTRO INNOVATIONS LLC (USA) — connecting
              Bangladesh, China, Sweden and the world.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                   className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--otro-gold)] hover:text-[var(--otro-ink)] transition">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">Shop</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs">
              <li><LocalizedClientLink className="hover:text-white" href="/store">All products</LocalizedClientLink></li>
              {topCats.slice(0, 6).map((c) => (
                <li key={c.id}><LocalizedClientLink className="hover:text-white" href={`/categories/${c.handle}`}>{c.name}</LocalizedClientLink></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">Collections</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs">
              <li><LocalizedClientLink className="hover:text-white" href="/collections/swedish-corner">Swedish Corner</LocalizedClientLink></li>
              {(collections || []).slice(0, 5).map((c) => (
                <li key={c.id}><LocalizedClientLink className="hover:text-white" href={`/collections/${c.handle}`}>{c.title}</LocalizedClientLink></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">Help</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs">
              <li><LocalizedClientLink className="hover:text-white" href="/shipping">Shipping &amp; delivery</LocalizedClientLink></li>
              <li><LocalizedClientLink className="hover:text-white" href="/returns">Returns &amp; refunds</LocalizedClientLink></li>
              <li><LocalizedClientLink className="hover:text-white" href="/account">Track your order</LocalizedClientLink></li>
              <li><LocalizedClientLink className="hover:text-white" href="/terms">Terms of service</LocalizedClientLink></li>
              <li><LocalizedClientLink className="hover:text-white" href="/privacy">Privacy policy</LocalizedClientLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">Talk to us</h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs">
              <li><a className="hover:text-white" href="https://wa.me/sheikhsocial" target="_blank" rel="noreferrer">WhatsApp · Sheikh Social</a></li>
              <li><a className="hover:text-white" href="https://wa.me/ImranSheikh40900297" target="_blank" rel="noreferrer">WhatsApp · Imran</a></li>
              <li><a className="hover:text-white" href="http://m.me/otrobd" target="_blank" rel="noreferrer">Messenger</a></li>
              <li><a className="hover:text-white" href="https://www.instagram.com/otrobd" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a className="hover:text-white" href="https://www.linkedin.com/company/14544269/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} OTRO INNOVATIONS LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Secure payment via Stripe</span>
            <span className="hidden md:inline ·">&nbsp;</span>
            <span>Cards · bKash · Nagad (soon) · Bank transfer</span>
            <span>Prices exclude shipping — calculated at checkout</span>
          </div>
        </div>
      </div>
    </footer>
  )
}