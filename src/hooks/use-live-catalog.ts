import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { catalog as baseCatalog, type Category, type CatalogItem } from "@/components/site/cart/catalog";

type Override = {
  service_key: string;
  name: string | null;
  price: number | null;
  original: number | null;
  deleted: boolean;
};

type CustomService = {
  id: string;
  category_id: string;
  subcategory: string | null;
  name: string;
  description: string | null;
  price: number;
  original: number | null;
  unit: string | null;
};

async function fetchOverridesAndCustoms() {
  const [ov, cs] = await Promise.all([
    supabase.from("service_overrides").select("*"),
    supabase.from("custom_services").select("*"),
  ]);
  return {
    overrides: (ov.data ?? []) as Override[],
    customs: (cs.data ?? []) as CustomService[],
  };
}

export function useLiveCatalog() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["live-catalog"],
    queryFn: fetchOverridesAndCustoms,
    staleTime: 30_000,
  });

  useEffect(() => {
    const ch = supabase
      .channel("catalog-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "service_overrides" }, () => {
        qc.invalidateQueries({ queryKey: ["live-catalog"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "custom_services" }, () => {
        qc.invalidateQueries({ queryKey: ["live-catalog"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [qc]);

  const overrides = data?.overrides ?? [];
  const customs = data?.customs ?? [];
  const ovMap = new Map(overrides.map((o) => [o.service_key, o]));

  const merged: Category[] = baseCatalog.map((cat) => {
    const items: CatalogItem[] = cat.items
      .map((item) => {
        const o = ovMap.get(item.id);
        if (!o) return item;
        if (o.deleted) return null;
        return {
          ...item,
          name: o.name ?? item.name,
          price: o.price != null ? Number(o.price) : item.price,
          original: o.original != null ? Number(o.original) : item.original,
        };
      })
      .filter((x): x is CatalogItem => x !== null);

    const extras: CatalogItem[] = customs
      .filter((c) => c.category_id === cat.id)
      .map((c) => ({
        id: `custom-${c.id}`,
        name: c.name,
        description: c.description ?? undefined,
        original: c.original != null ? Number(c.original) : Number(c.price),
        price: Number(c.price),
        rating: 4.7,
        unit: c.unit ?? undefined,
        image: cat.image,
        subcategory: c.subcategory ?? undefined,
      }));

    return { ...cat, items: [...items, ...extras] };
  });

  return merged;
}
