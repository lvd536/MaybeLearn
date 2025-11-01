import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const client: SupabaseClient = createClient(
    import.meta.env.VITE_DB_URL,
    import.meta.env.VITE_DB_KEY
);