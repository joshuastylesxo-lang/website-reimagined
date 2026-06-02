import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useLiveCatalog } from "@/hooks/use-live-catalog";

export const Route = createFileRoute("/home-services")({
  head: () => ({
    meta: [
      { title: "Home Services — Plumber, Electrician, Carpenter & more | AllFix" },
      { name: "description", content: "Browse home maintenance subcategories: plumber, electrician, handyman, carpenter, painter, appliances, geyser and pest control." },
      { property: "og:title", content: "Home Services — AllFix" },
      { property: "og:description", content: "Pick a home service category to view all services." },
    ],
  }),
  component: HomeServicesPage,
});

function HomeServicesPage() {
  const catalog = useLiveCatalog();
  const subs = catalog.filter((c) => c.parent === "home-services");
  return (
    <div className="pb-16">
      <section className="pt-6 pb-2 sm:pt-10">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-brand mb-3">
            <ArrowLeft className="h-3.5 w-3.5" /> All categories
          </Link>
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-brand mb-2">
              Home Services
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Pick a <span className="text-gradient-brand">service category</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Tap any category to see all services inside.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-4 sm:pt-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {subs.map((c) => (
              <Link
                key={c.id}
                to="/categories/$id"
                params={{ id: c.id }}
                className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                    {c.blurb}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-brand">
                    {c.items.length} services →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
