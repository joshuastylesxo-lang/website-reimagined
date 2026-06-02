import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = {
  loading: boolean;
  userId: string | null;
  isAdmin: boolean;
};

export function useAdminSession(): AdminState {
  const [state, setState] = useState<AdminState>({ loading: true, userId: null, isAdmin: false });

  useEffect(() => {
    let active = true;

    async function check(userId: string | null) {
      if (!userId) {
        if (active) setState({ loading: false, userId: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (active) setState({ loading: false, userId, isAdmin: !!data });
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      check(data.session?.user?.id ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
