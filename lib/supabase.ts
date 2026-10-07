import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

let admin: SupabaseClient | null = null;

/** Client service-role, réservé aux routes serveur et Edge Functions. */
export function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) return null;
  if (!admin) {
    admin = createClient(env.supabaseUrl, env.supabaseServiceRole, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

/** Client navigateur (clé anon). Inactif tant que les variables publiques manquent. */
export function getSupabaseBrowser() {
  if (!env.supabaseUrl || !env.supabaseAnonKey) return null;
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
