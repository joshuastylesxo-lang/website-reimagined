import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveCatalog } from "@/hooks/use-live-catalog";
import { About } from "@/components/site/About";
import { Reviews } from "@/components/site/Reviews";
import logoAsset from "@/assets/allfix-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AllFix Maintenance Services — Cleaning & Home Care | Islamabad" },
      {
        name: "description",
        content:
          "Browse cleaning and maintenance services by category — sofa, carpet, mattress, water tanks, deep cleaning, solar and more. Bahria Town, Islamabad.",
      },
      { property: "og:title", content: "AllFix Maintenance Services" },
      {
        property: "og:description",
        content: "Pick a category to see all services and order online.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const catalog = useLiveCatalog();
  const topCategories = catalog.filter((c) => !c.parent);

  const headOrder = ["ac", "plumber", "electrician", "solar", "water-tank"];
  const tailOrder = ["cleaning", "carpenter"];
  const ordered = [
    ...headOrder.map((id) => topCategories.find((c) => c.id === id)).filter(Boolean),
    ...topCategories.filter(
      (c) => !headOrder.includes(c.id) && !tailOrder.includes(c.id),
    ),
    ...tailOrder.map((id) => topCategories.find((c) => c.id === id)).filter(Boolean),
  ] as typeof topCategories;

  const renderCard = (c: (typeof topCategories)[0]) => (
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
  );


  return (
    <div>
      <section className="pt-6 pb-2 sm:pt-10 sm:pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <img
              src={logoAsset.url}
              alt="AllFix Maintenance Services PVT LIMITED"
              className="w-full max-w-md sm:max-w-xl lg:max-w-2xl h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="pt-2 pb-4 sm:pt-4 sm:pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-brand mb-2">
              Service Categories
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Pick a <span className="text-gradient-brand">category</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Tap any category to see all services inside.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {ordered.map((c) => renderCard(c))}
          </div>

        </div>
      </section>

      <About />
      <Reviews />
    </div>
  );
}
