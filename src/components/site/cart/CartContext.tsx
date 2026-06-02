import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CatalogItem } from "./catalog";

export type CartLine = CatalogItem & { qty: number; categoryName: string };

type CartCtx = {
  items: CartLine[];
  count: number;
  total: number;
  originalTotal: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  add: (item: CatalogItem, categoryName: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("allfix-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("allfix-cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const add = useCallback((item: CatalogItem, categoryName: string) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1, categoryName }];
    });
    setOpen(true);
  }, []);
  const inc = useCallback((id: string) => setItems((p) => p.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x)), []);
  const dec = useCallback((id: string) => setItems((p) => p.flatMap((x) => x.id === id ? (x.qty <= 1 ? [] : [{ ...x, qty: x.qty - 1 }]) : [x])), []);
  const remove = useCallback((id: string) => setItems((p) => p.filter((x) => x.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const { count, total, originalTotal } = useMemo(() => ({
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.qty * i.price, 0),
    originalTotal: items.reduce((s, i) => s + i.qty * i.original, 0),
  }), [items]);

  return (
    <Ctx.Provider value={{ items, count, total, originalTotal, isOpen, setOpen, add, inc, dec, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
