import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

export const metadata: Metadata = {
  title: "All products — OTRO Shop",
  description: "Browse every product across all departments. Prices exclude shipping, calculated at checkout.",
}

export default async function StorePage(props: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ sortBy?: SortOptions; page?: string }>
}) {
  const { countryCode } = await props.params
  const sp = await props.searchParams

  const region = await getRegion(countryCode)
  if (!region) {
    notFound()
  }

  const page = sp.page ? parseInt(sp.page) : 1
  const sortBy = sp.sortBy || "created_at"

  return (
    <div className="otro-container py-8" data-testid="category-container">
      <div className="mb-3">
        <span className="otro-eyebrow">Catalog</span>
        <h1 className="otro-heading mt-1 text-3xl" data-testid="store-page-title">All products</h1>
        <p className="mt-2 text-sm text-[var(--otro-muted)]">
          Prices exclude shipping — calculated at checkout.
        </p>
      </div>

      <div className="mt-6 flex flex-col small:flex-row small:items-start">
        <RefinementList sortBy={sortBy} data-testid="sort-by-container" hideOptionsPicker />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid numberOfProducts={12} />}>
            <PaginatedProducts sortBy={sortBy} page={page} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}