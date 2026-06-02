import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveCatalog } from "@/hooks/use-live-catalog";
import { About } from "@/components/site/About";
import { Reviews } from "@/components/site/Reviews";

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

  const mobileTopIds = ["home-services", "cleaning"];
  const mobileTop = topCategories.filter((c) => mobileTopIds.includes(c.id));
  const restCategories = topCategories.filter((c) => !mobileTopIds.includes(c.id));

  const renderCard = (c: (typeof topCategories)[0]) => (
    <Link
      key={c.id}
      {...(c.id === "home-services"
        ? { to: "/home-services" as const }
        : { to: "/categories/$id" as const, params: { id: c.id } })}
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
          {c.id === "home-services"
            ? `${catalog.filter((x) => x.parent === "home-services").length} categories →`
            : `${c.items.length} services →`}
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <section className="pt-6 pb-4 sm:pt-10 sm:pb-8">
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

          {/* Mobile: Home Services + Cleaning Services stacked full-width */}
          <div className="flex flex-col gap-3 sm:hidden mb-3">
            {mobileTop.map((c) => renderCard(c))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {restCategories.map((c) => renderCard(c))}
            {/* On sm+ show the top two cards inside the grid too */}
            {mobileTop.map((c) => (
              <div key={c.id} className="hidden sm:block">
                {renderCard(c)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />
      <Reviews />
    </div>
  );
}
