import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"
import TopBar from "@modules/layout/components/top-bar"

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  const topCats = (categories || []).filter((c) => !c.parent_category_id).slice(0, 7)

  return (
    <div className="sticky top-0 inset-x-0 z-50 w-full">
      <TopBar regions={regions} />
      <header className="border-b border-[var(--otro-line)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <nav className="otro-container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 small:hidden">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>

          <LocalizedClientLink href="/" className="flex items-baseline gap-2" data-testid="nav-store-link">
            <span className="text-[22px] font-extrabold tracking-[-0.04em] text-[var(--otro-ink)]">OTRO</span>
            <span className="hidden xs:inline text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--otro-gold)]">
              Shop
            </span>
          </LocalizedClientLink>

          <div className="hidden small:flex items-center gap-7 text-[13px] font-medium text-[var(--otro-ink)]">
            <div className="group relative">
              <button className="flex items-center gap-1 py-5 hover:text-[var(--otro-gold)]">
                Shop all
                <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 opacity-60"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
              </button>
              <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition absolute left-0 top-full w-[640px] rounded-2xl border border-[var(--otro-line)] bg-white p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                  {topCats.length > 0 ? (
                    topCats.map((c) => (
                      <div key={c.id} className="flex flex-col gap-2">
                        <LocalizedClientLink href={`/categories/${c.handle}`} className="text-sm font-semibold text-[var(--otro-ink)] hover:text-[var(--otro-gold)]">
                          {c.name}
                        </LocalizedClientLink>
                        <ul className="flex flex-col gap-1.5">
                          {(c.category_children || []).slice(0, 6).map((ch) => (
                            <li key={ch.id}>
                              <LocalizedClientLink href={`/categories/${ch.handle}`} className="text-xs text-[var(--otro-muted)] hover:text-[var(--otro-ink)]">
                                {ch.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-sm text-[var(--otro-muted)]">
                      Categories will appear here once you add them in the admin.
                    </div>
                  )}
                </div>
                <div className="mt-5 border-t border-[var(--otro-line)] pt-4">
                  <LocalizedClientLink href="/store" className="text-xs font-semibold text-[var(--otro-gold)] hover:underline">
                    Browse everything →
                  </LocalizedClientLink>
                </div>
              </div>
            </div>

            {topCats.slice(0, 4).map((c) => (
              <LocalizedClientLink key={c.id} href={`/categories/${c.handle}`} className="py-5 hover:text-[var(--otro-gold)]">
                {c.name}
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink href="/collections/swedish-corner" className="py-5 hover:text-[var(--otro-gold)]">
              Swedish Corner
            </LocalizedClientLink>
            <a href="https://wa.me/sheikhsocial" target="_blank" rel="noreferrer" className="py-5 hover:text-[var(--otro-gold)]">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 small:gap-6 h-full text-[var(--otro-ink)]">
            <Search />
            <LocalizedClientLink className="hidden small:inline hover:text-[var(--otro-gold)]" href="/account" data-testid="nav-account-link">
              Account
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink className="flex gap-2 hover:text-[var(--otro-gold)]" href="/cart" data-testid="nav-cart-link">
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}