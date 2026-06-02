import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { CartProvider, useCart } from "@/components/site/cart/CartContext";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingCTA } from "@/components/site/FloatingCTA";
import { MobileCartBar } from "@/components/site/MobileCartBar";
import { Toaster } from "@/components/ui/sonner";
import { ShoppingCart } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <SiteNav />
          <main className="flex-1 pb-24 sm:pb-0">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <FloatingCTA />
        <MobileCartBar />
        <CartDrawer />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </QueryClientProvider>
  );
}

function SiteNav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/85 border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link
            to="/"
            className="px-4 py-2 rounded-full text-foreground bg-muted/60 hover:bg-muted transition-colors"
            activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary/90" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full text-foreground bg-muted/60 hover:bg-muted transition-colors"
            activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary/90" }}
          >
            Contact
          </Link>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open cart"
          className="relative inline-flex items-center justify-center h-10 w-10 rounded-full text-foreground hover:bg-muted transition"
        >
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-brand text-brand-foreground text-[11px] font-bold grid place-items-center shadow-glow">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} AllFix Maintenance Services
    </footer>
  );
}
