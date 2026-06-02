import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { catalog as baseCatalog } from "@/components/site/cart/catalog";
import { useAdminSession } from "@/hooks/use-admin-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, Save, Trash2, RotateCcw, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

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

function AdminPage() {
  const { loading, isAdmin } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) navigate({ to: "/admin/login", replace: true });
  }, [loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isAdmin) return null;

  return <AdminDashboard />;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [customs, setCustoms] = useState<CustomService[]>([]);
  const [activeCat, setActiveCat] = useState(baseCatalog[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  async function load() {
    const [ov, cs] = await Promise.all([
      supabase.from("service_overrides").select("*"),
      supabase.from("custom_services").select("*").order("created_at", { ascending: false }),
    ]);
    const map: Record<string, Override> = {};
    (ov.data ?? []).forEach((r: any) => (map[r.service_key] = r));
    setOverrides(map);
    setCustoms((cs.data ?? []) as CustomService[]);
  }

  useEffect(() => {
    load();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  const cats = useMemo(() => baseCatalog, []);
  const activeCategory = cats.find((c) => c.id === activeCat);
  const customsForCat = customs.filter((c) => c.category_id === activeCat);

  function effective(itemId: string, field: "name" | "price" | "original", fallback: string | number) {
    const o = overrides[itemId];
    if (!o) return fallback;
    const v = (o as any)[field];
    if (v === null || v === undefined) return fallback;
    return v;
  }

  async function saveOverride(itemId: string, fields: Partial<Override>) {
    setSaving(itemId);
    const current = overrides[itemId] ?? { service_key: itemId, name: null, price: null, original: null, deleted: false };
    const next: Override = { ...current, ...fields, service_key: itemId };
    const { error } = await supabase.from("service_overrides").upsert(next, { onConflict: "service_key" });
    setSaving(null);
    if (error) return toast.error(error.message);
    setOverrides((m) => ({ ...m, [itemId]: next }));
    toast.success("Saved");
  }

  async function resetOverride(itemId: string) {
    setSaving(itemId);
    const { error } = await supabase.from("service_overrides").delete().eq("service_key", itemId);
    setSaving(null);
    if (error) return toast.error(error.message);
    setOverrides((m) => {
      const { [itemId]: _, ...rest } = m;
      return rest;
    });
    toast.success("Reset to default");
  }

  async function deleteService(itemId: string) {
    if (!confirm("Hide this service from the website?")) return;
    await saveOverride(itemId, { deleted: true });
  }

  async function restoreService(itemId: string) {
    await saveOverride(itemId, { deleted: false });
  }

  async function deleteCustom(id: string) {
    if (!confirm("Delete this custom service?")) return;
    const { error } = await supabase.from("custom_services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setCustoms((cs) => cs.filter((c) => c.id !== id));
    toast.success("Deleted");
  }

  async function saveCustom(c: CustomService) {
    setSaving(c.id);
    const { error } = await supabase
      .from("custom_services")
      .update({ name: c.name, price: c.price, original: c.original, subcategory: c.subcategory, description: c.description, unit: c.unit })
      .eq("id", c.id);
    setSaving(null);
    if (error) return toast.error(error.message);
    toast.success("Saved");
  }

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newOriginal, setNewOriginal] = useState("");
  const [newSubcat, setNewSubcat] = useState("");
  const [newDesc, setNewDesc] = useState("");

  async function addNew() {
    if (!newName || !newPrice) return toast.error("Name and price required");
    const { data, error } = await supabase
      .from("custom_services")
      .insert({
        category_id: activeCat,
        name: newName,
        price: Number(newPrice),
        original: newOriginal ? Number(newOriginal) : null,
        subcategory: newSubcat || null,
        description: newDesc || null,
      })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setCustoms((cs) => [data as CustomService, ...cs]);
    setNewName("");
    setNewPrice("");
    setNewOriginal("");
    setNewSubcat("");
    setNewDesc("");
    toast.success("Service added");
  }

  const filteredItems = activeCategory?.items.filter((i) =>
    !query || i.name.toLowerCase().includes(query.toLowerCase())
  ) ?? [];

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              activeCat === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <Input
        placeholder="Search services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4"
      />

      <details className="mb-6 rounded-xl border border-border bg-card p-4">
        <summary className="cursor-pointer font-semibold text-sm flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add new service to {activeCategory?.name}
        </summary>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <Input placeholder="Service name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Input placeholder="Subcategory (optional)" value={newSubcat} onChange={(e) => setNewSubcat(e.target.value)} />
          <Input placeholder="Price (Rs)" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
          <Input placeholder="Original price (optional)" type="number" value={newOriginal} onChange={(e) => setNewOriginal(e.target.value)} />
          <Input placeholder="Description (optional)" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="sm:col-span-2" />
          <Button onClick={addNew} className="sm:col-span-2">
            <Plus className="h-4 w-4" /> Add service
          </Button>
        </div>
      </details>

      {customsForCat.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
            Custom services ({customsForCat.length})
          </h2>
          <div className="space-y-2">
            {customsForCat.map((c, idx) => (
              <CustomRow
                key={c.id}
                value={c}
                onChange={(next) => setCustoms((arr) => arr.map((x, i) => (i === customs.indexOf(c) ? next : x)))}
                onSave={() => saveCustom(c)}
                onDelete={() => deleteCustom(c.id)}
                saving={saving === c.id}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
        Services ({filteredItems.length})
      </h2>
      <div className="space-y-2">
        {filteredItems.map((item) => {
          const o = overrides[item.id];
          const isDeleted = !!o?.deleted;
          return (
            <ItemRow
              key={item.id}
              item={item}
              name={effective(item.id, "name", item.name) as string}
              price={effective(item.id, "price", item.price) as number}
              original={effective(item.id, "original", item.original) as number}
              isDeleted={isDeleted}
              hasOverride={!!o}
              saving={saving === item.id}
              onSave={(name, price, original) => saveOverride(item.id, { name, price, original })}
              onReset={() => resetOverride(item.id)}
              onDelete={() => deleteService(item.id)}
              onRestore={() => restoreService(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function ItemRow({
  item,
  name,
  price,
  original,
  isDeleted,
  hasOverride,
  saving,
  onSave,
  onReset,
  onDelete,
  onRestore,
}: {
  item: { id: string; name: string; price: number; original: number };
  name: string;
  price: number;
  original: number;
  isDeleted: boolean;
  hasOverride: boolean;
  saving: boolean;
  onSave: (name: string, price: number, original: number) => void;
  onReset: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  const [n, setN] = useState(name);
  const [p, setP] = useState(String(price));
  const [o, setO] = useState(String(original));

  useEffect(() => {
    setN(name);
    setP(String(price));
    setO(String(original));
  }, [name, price, original]);

  const dirty = n !== name || p !== String(price) || o !== String(original);

  return (
    <div className={`rounded-xl border bg-card p-3 ${isDeleted ? "border-destructive/40 opacity-60" : "border-border"}`}>
      <div className="grid sm:grid-cols-[1fr_120px_120px_auto] gap-2 items-center">
        <Input value={n} onChange={(e) => setN(e.target.value)} placeholder="Name" />
        <Input value={p} onChange={(e) => setP(e.target.value)} placeholder="Price" type="number" />
        <Input value={o} onChange={(e) => setO(e.target.value)} placeholder="Original" type="number" />
        <div className="flex gap-1.5 flex-wrap">
          {dirty && (
            <Button size="sm" onClick={() => onSave(n, Number(p), Number(o))} disabled={saving}>
              <Save className="h-3.5 w-3.5" /> Save
            </Button>
          )}
          {hasOverride && !dirty && (
            <Button size="sm" variant="outline" onClick={onReset} disabled={saving} title="Reset to original values">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
          {isDeleted ? (
            <Button size="sm" variant="outline" onClick={onRestore} disabled={saving}>
              Restore
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={onDelete} disabled={saving} className="text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      <div className="mt-1 text-[10px] text-muted-foreground font-mono">{item.id}</div>
    </div>
  );
}

function CustomRow({
  value,
  onChange,
  onSave,
  onDelete,
  saving,
}: {
  value: CustomService;
  onChange: (v: CustomService) => void;
  onSave: () => void;
  onDelete: () => void;
  saving: boolean;
}) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
      <div className="grid sm:grid-cols-[1fr_140px_120px_auto] gap-2 items-center">
        <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} placeholder="Name" />
        <Input
          value={value.subcategory ?? ""}
          onChange={(e) => onChange({ ...value, subcategory: e.target.value || null })}
          placeholder="Subcategory"
        />
        <Input
          type="number"
          value={value.price}
          onChange={(e) => onChange({ ...value, price: Number(e.target.value) })}
          placeholder="Price"
        />
        <div className="flex gap-1.5">
          <Button size="sm" onClick={onSave} disabled={saving}>
            <Save className="h-3.5 w-3.5" /> Save
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} disabled={saving} className="text-destructive hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
