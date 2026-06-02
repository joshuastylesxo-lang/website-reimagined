import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ChevronDown, Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import { catalog as baseCatalog, type CatalogItem } from "@/components/site/cart/catalog";
import { useLiveCatalog } from "@/hooks/use-live-catalog";
import { useCart } from "@/components/site/cart/CartContext";
import { Button } from "@/components/ui/button";
import { LIABILITY_DISCLAIMER } from "@/lib/terms";

export const Route = createFileRoute("/categories/$id")({
  head: ({ params }) => {
    const cat = baseCatalog.find((c) => c.id === params.id);
    const title = cat ? `${cat.name} — AllFix` : "Category — AllFix";
    const description = cat?.blurb ?? "Browse services in this category.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const cat = baseCatalog.find((c) => c.id === params.id);
    if (!cat) throw notFound();
    return { id: params.id };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-2">Category not found</h1>
      <Link to="/" className="text-brand font-semibold">← Back to categories</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground">{error.message}</p>
      <Link to="/" className="text-brand font-semibold">← Back</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useLoaderData();
  const catalog = useLiveCatalog();
  const cat = catalog.find((c) => c.id === id) ?? baseCatalog.find((c) => c.id === id)!;

  return (
    <div className="pb-16">
      <div className="relative h-44 sm:h-60 overflow-hidden">
        <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-brand mb-2 w-fit">
            <ArrowLeft className="h-3.5 w-3.5" /> All categories
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold">{cat.name}</h1>
          <p className="text-red-600 mt-1 max-w-md text-sm sm:text-base font-semibold">{cat.blurb}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {(() => {
          const groups = new Map<string, CatalogItem[]>();
          for (const item of cat.items) {
            const key = item.subcategory ?? "";
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(item);
          }
          const entries = Array.from(groups.entries());
          const hasGroups = entries.some(([k]) => k !== "");
          if (!hasGroups) {
            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {cat.items.map((item: CatalogItem) => (
                  <ServiceCard key={item.id} item={item} categoryName={cat.name} image={item.image ?? cat.image} />
                ))}
              </div>
            );
          }
          return (
            <div className="space-y-10">
              {entries.map(([group, items]) => (
                <section
                  key={group || "other"}
                  id={group ? group.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined}
                  className="scroll-mt-24"
                >
                  {group && (
                    <h2 className="text-lg sm:text-2xl font-bold mb-4 border-l-4 border-brand pl-3">{group}</h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {items.map((item: CatalogItem) => (
                      <ServiceCard key={item.id} item={item} categoryName={cat.name} image={item.image ?? cat.image} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function ServiceCard({ item, categoryName, image }: { item: CatalogItem; categoryName: string; image: string }) {
  const { items, add, inc, dec } = useCart();
  const line = items.find((i) => i.id === item.id);
  const off = Math.round(((item.original - item.price) / item.original) * 100);
  const [showTerms, setShowTerms] = useState(false);
  const hasIncludes = !!(item.includes && item.includes.length > 0);
  const hasExcludes = !!(item.excludes && item.excludes.length > 0);

  return (
    <div className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={image} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
        {off > 0 && (
          <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-brand text-brand-foreground text-[11px] font-bold px-2.5 py-1 shadow-glow">
            {off}% OFF
          </span>
        )}
      </div>
      <div className="flex flex-col p-4 sm:p-5 flex-1">
        <h4 className="text-base font-semibold leading-snug line-clamp-2 min-h-[2.75rem]">{item.name}</h4>
        {item.description && (
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
        )}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-foreground">{item.rating.toFixed(1)}</span>
          <span>· Verified pros</span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-border">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through leading-tight">Rs {item.original.toLocaleString()}</span>
            <span className="text-xl font-bold text-brand leading-tight">Rs {item.price.toLocaleString()}</span>
            {item.unit && <span className="text-[11px] text-muted-foreground leading-tight">{item.unit}</span>}
          </div>
          {line ? (
            <div className="flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 p-1 shrink-0">
              <button onClick={() => dec(item.id)} className="h-8 w-8 grid place-items-center rounded-full bg-background hover:bg-brand hover:text-brand-foreground transition" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center font-bold text-brand">{line.qty}</span>
              <button onClick={() => inc(item.id)} className="h-8 w-8 grid place-items-center rounded-full bg-brand text-brand-foreground hover:scale-110 transition" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button size="sm" onClick={() => add(item, categoryName)} className="rounded-full bg-brand hover:bg-brand text-brand-foreground font-semibold shadow-glow hover:scale-105 transition-transform shrink-0">
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          )}
        </div>
        <div className="mt-3 border-t border-border pt-3">
            <button
              type="button"
              onClick={() => setShowTerms((v) => !v)}
              aria-expanded={showTerms}
              className="flex w-full items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <span>Terms &amp; Conditions</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showTerms ? "rotate-180" : ""}`} />
            </button>
            {showTerms && (
              <div className="mt-3 space-y-3 animate-fade-in">
                {hasIncludes && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-brand mb-1.5">Includes</p>
                    <ul className="space-y-1">
                      {item.includes!.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-xs text-foreground/90">
                          <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-green-600" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasExcludes && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-destructive mb-1.5">Does Not Include</p>
                    <ul className="space-y-1">
                      {item.excludes!.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <X className="h-3.5 w-3.5 mt-0.5 shrink-0 text-destructive" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="border-t border-border pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-destructive mb-1.5">Liability Disclaimer</p>
                  <p className="text-xs text-foreground/90 leading-relaxed">{LIABILITY_DISCLAIMER}</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
