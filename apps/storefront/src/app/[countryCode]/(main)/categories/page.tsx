import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const dynamic = "force-static"
export const revalidate = 60

export const metadata: Metadata = {
  title: "All categories — OTRO Shop",
  description: "Browse every department: shoes, bags, jewelry, clothing, electronics, home, tools and more.",
}

const EMOJI: Record<string, string> = {
  "Shoes": "👟",
  "Bags": "👜",
  "Jewelry": "💍",
  "Beauty & Personal Care": "💄",
  "Men's Clothing": "👔",
  "Women's Clothing": "👗",
  "Baby Items": "👶",
  "Eyewear": "🕶️",
  "Office & School Supplies": "✏️",
  "Phone Accessories": "📱",
  "Sports & Fitness": "🏋️",
  "Entertainment": "🎮",
  "Watches": "⌚",
  "Automobile": "🚗",
  "Pets Food": "🐾",
  "Outdoor & Travelling": "🏕️",
  "Electronics & Gadgets": "💻",
  "Home & Kitchen": "🏠",
  "Tools & Home Improvement": "🛠️",
}

export default async function CategoriesPage() {
  const categories = await listCategories({
    fields: "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    limit: 1000,
  })

  const list = categories || []
  const childrenOf: Record<string, typeof list> = {}
  for (const c of list) {
    if (c.parent_category_id) {
      ;(childrenOf[c.parent_category_id] ||= []).push(c)
    }
  }
  const tops = list
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="otro-container py-12">
      <span className="otro-eyebrow">Directory</span>
      <h1 className="otro-heading mt-2 text-3xl sm:text-4xl">All categories</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--otro-muted)]">
        {tops.length} departments · {list.length} categories. From everyday essentials to heavy machinery —
        everything ships worldwide.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {tops.map((top) => {
          const kids = (childrenOf[top.id] || []).sort((a, b) => a.name.localeCompare(b.name))
          return (
            <section key={top.id} className="otro-card p-6">
              <div className="flex items-center justify-between">
                <LocalizedClientLink href={`/categories/${top.handle}`} className="flex items-center gap-2.5 group">
                  <span className="text-2xl">{EMOJI[top.name] ?? "🛍️"}</span>
                  <span className="text-base font-bold text-[var(--otro-ink)] group-hover:text-[var(--otro-gold)]">
                    {top.name}
                  </span>
                </LocalizedClientLink>
                <span className="text-[11px] text-[var(--otro-muted)]">{kids.length}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {kids.slice(0, 18).map((k) => (
                  <LocalizedClientLink
                    key={k.id}
                    href={`/categories/${k.handle}`}
                    className="rounded-full border border-[var(--otro-line)] px-3 py-1.5 text-xs text-[var(--otro-muted)] transition hover:border-[var(--otro-ink)] hover:text-[var(--otro-ink)]"
                  >
                    {k.name}
                  </LocalizedClientLink>
                ))}
                {kids.length > 18 && (
                  <LocalizedClientLink
                    href={`/categories/${top.handle}`}
                    className="rounded-full bg-[var(--otro-cream)] px-3 py-1.5 text-xs font-semibold text-[var(--otro-ink)]"
                  >
                    +{kids.length - 18} more
                  </LocalizedClientLink>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}