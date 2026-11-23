// Valeurs de repli pour que `next build` et la CI ne cassent jamais en l'absence
// de `.env.local` (aucun secret réel n'est requis pour compiler l'app — seulement
// pour qu'une vraie connexion Supabase fonctionne à l'usage).
const URL_PLACEHOLDER = "https://placeholder.supabase.co";
const CLE_PLACEHOLDER = "placeholder-anon-key";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || URL_PLACEHOLDER;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || CLE_PLACEHOLDER;
