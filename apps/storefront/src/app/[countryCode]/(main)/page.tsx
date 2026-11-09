import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getRegion, listRegions } from "@lib/data/regions"
import { toJsonLd } from "@lib/util/product-structured-data"
import { getSiteOrigin, listCountryCodes, STORE_NAME } from "@lib/util/site"
import { buildRegionsReturnPolicies } from "@lib/util/store-policies"

export const dynamic = "force-static"
export const revalidate = 60

const trust = [
  { t: "Worldwide delivery", d: "DHL & FedEx for international orders" },
  { t: "Transparent pricing", d: "Clear product + shipping costs" },
  { t: "Secure payments", d: "Stripe cards, local wallets soon" },
  { t: "Real support", d: "WhatsApp & Messenger, human replies" },
]

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])

  return {
    title: "OTRO Shop — Global products, delivered",
    description:
      "Curated products from Bangladesh, China, Sweden and beyond. Transparent pricing, worldwide shipping, secure checkout. A division of OTRO INNOVATIONS LLC.",
    alternates: {
      canonical: `${origin}/${countryCode}`,
      languages: {
        ...Object.fromEntries(
          listCountryCodes(regions).map((code) => [
            `en-${code.toUpperCase()}`,
            `${origin}/${code}`,
          ])
        ),
        "x-default": origin,
      },
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const [region, { collections }, categories] = await Promise.all([
    getRegion(countryCode),
    listCollections({ fields: "id, handle, title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
      limit: 1000,
    }),
  ])

  if (!region) {
    return null
  }

  const topCats = (categories || []).filter((c) => !c.parent_category_id).slice(0, 8)

  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])
  const homeUrl = `${origin}/${countryCode}`
  const returnPolicies = buildRegionsReturnPolicies(regions)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: STORE_NAME || "OTRO Shop",
      url: origin,
      ...(returnPolicies.length ? { hasMerchantReturnPolicy: returnPolicies } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: STORE_NAME || "OTRO Shop",
      url: homeUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${homeUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(structuredData) }}
      />

      <Hero />

      {/* Trust strip */}
      <section className="border-b border-[var(--otro-line)] bg-white">
        <div className="otro-container grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
          {trust.map((x) => (
            <div key={x.t} className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--otro-cream)] text-[var(--otro-gold)]">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0z"/></svg>
              </span>
              <div>
                <p className="text-[13px] font-semibold text-[var(--otro-ink)]">{x.t}</p>
                <p className="text-[11px] text-[var(--otro-muted)]">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {topCats.length > 0 && (
        <section className="otro-container py-14">
          <div className="flex items-end justify-between">
            <div>
              <span className="otro-eyebrow">Browse</span>
              <h2 className="otro-heading mt-2 text-2xl sm:text-3xl">Shop by category</h2>
            </div>
            <LocalizedClientLink href="/store" className="text-xs font-semibold text-[var(--otro-muted)] hover:text-[var(--otro-ink)]">
              View all →
            </LocalizedClientLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {topCats.map((c) => (
              <LocalizedClientLink
                key={c.id}
                href={`/categories/${c.handle}`}
                className="otro-card group flex items-center justify-between p-5"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--otro-ink)]">{c.name}</p>
                  <p className="mt-1 text-[11px] text-[var(--otro-muted)]">
                    {(c.category_children?.length || 0) > 0
                      ? `${c.category_children!.length} subcategories`
                      : "Explore now"}
                  </p>
                </div>
                <span className="text-[var(--otro-gold)] transition group-hover:translate-x-0.5">→</span>
              </LocalizedClientLink>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="otro-container pb-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="otro-eyebrow">Featured</span>
            <h2 className="otro-heading mt-2 text-2xl sm:text-3xl">Fresh finds</h2>
          </div>
          <LocalizedClientLink href="/store" className="text-xs font-semibold text-[var(--otro-muted)] hover:text-[var(--otro-ink)] pb-1">
            View all →
          </LocalizedClientLink>
        </div>
        <div className="mt-6">
          <PaginatedProducts sortBy="created_at" page={1} countryCode={countryCode} />
        </div>
      </section>

      {/* Swedish Corner promo */}
      <section className="otro-container py-14">
        <div className="overflow-hidden rounded-3xl bg-[var(--otro-ink)] px-8 py-12 text-white md:px-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--otro-gold)]">Swedish Corner</span>
              <h3 className="otro-heading mt-3 text-3xl text-white sm:text-4xl">
                Authentic Swedish brands &amp; goods — shipped worldwide.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                Anything you love from Sweden, we buy locally and ship to you via DHL &amp; FedEx.
                From design and fashion to specialty foods and electronics — handled end to end.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LocalizedClientLink href="/collections/swedish-corner" className="otro-btn-gold">
                  Explore Swedish Corner
                </LocalizedClientLink>
                <a href="https://wa.me/sheikhsocial" target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  Request an item
                </a>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm text-white/80">
              {["Fashion & design", "Home & interiors", "Beauty & health", "Electronics & gadgets"].map((t) => (
                <li key={t} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}