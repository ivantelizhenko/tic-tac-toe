import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { SupabaseContext } from "../hooks/useSupabase";

function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export default SupabaseProvider;
