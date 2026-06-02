import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart/CartContext";

export function MobileCartBar() {
  const { count, total, setOpen } = useCart();
  if (count === 0) return null;
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <button
        onClick={() => setOpen(true)}
        className="pointer-events-auto w-full h-14 rounded-2xl bg-brand text-brand-foreground shadow-glow flex items-center justify-between px-4 font-semibold animate-fade-in"
      >
        <span className="flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-foreground/15">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-background text-brand text-[11px] font-bold grid place-items-center">
              {count}
            </span>
          </span>
          View Cart
        </span>
        <span className="flex items-center gap-2">
          <span className="text-base">Rs {total.toLocaleString()}</span>
          <span aria-hidden>→</span>
        </span>
      </button>
    </div>
  );
}
