import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAnonKey, supabaseUrl } from "./env";

// Rafraîchit le cookie de session à chaque requête (recette standard @supabase/ssr).
// Ne redirige pas encore selon l'authentification — voir décision actée dans le plan
// de la PR : la protection des routes coach/athlète est un suivi, une fois qu'un
// projet Supabase de test existera pour la CI.
export async function mettreAJourSession(request: NextRequest) {
  let reponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesASetter) {
        cookiesASetter.forEach(({ name, value }) => request.cookies.set(name, value));
        reponse = NextResponse.next({ request });
        cookiesASetter.forEach(({ name, value, options }) => reponse.cookies.set(name, value, options));
      }
    }
  });

  await supabase.auth.getUser();

  return reponse;
}
