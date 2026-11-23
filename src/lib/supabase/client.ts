import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

export function creerClientNavigateur() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
