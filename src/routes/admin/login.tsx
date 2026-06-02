import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";

const ADMIN_ID = "aamirzaman9900";
const ADMIN_EMAIL = "aamirzaman9900@admin.local";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login" }, { name: "robots", content: "noindex" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (id.trim().toLowerCase() !== ADMIN_ID) {
      setLoading(false);
      setError("Invalid credentials");
      return;
    }

    const { data, error: signErr } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    if (signErr || !data.user) {
      setLoading(false);
      setError("Invalid credentials");
      return;
    }

    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Invalid credentials");
      return;
    }

    setLoading(false);
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 grid place-items-center">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="mt-1 text-xs text-muted-foreground">Restricted area — authorized personnel only.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold">Admin ID</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your admin ID"
              className="pl-9"
              autoComplete="username"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="pl-9"
              autoComplete="current-password"
            />
          </div>
        </div>

        {error && (
          <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
