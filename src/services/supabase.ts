import { createClient } from '@supabase/supabase-js'

export const client = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY);