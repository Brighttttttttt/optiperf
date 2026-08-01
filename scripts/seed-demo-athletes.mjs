// Crée les 4 comptes athlète de démo (Léa, Sofia, Karim, Tom) directement dans
// Supabase, pour retrouver un dashboard peuplé une fois la fiche athlète
// branchée sur les vraies données (voir la PR qui suit celle-ci).
//
// Prérequis : tu t'es déjà inscrit comme coach via /login (un vrai compte doit
// exister avec le rôle "coach" avant de lancer ce script).
//
// Usage (PowerShell, depuis la racine du projet) :
//   $env:SUPABASE_URL = "https://ton-projet.supabase.co"
//   $env:SUPABASE_SERVICE_ROLE_KEY = "la-clé-service_role"   # Project Settings → API — JAMAIS dans .env.local, jamais commitée
//   node scripts/seed-demo-athletes.mjs
//
// La clé service_role contourne les règles de sécurité (RLS) : ne l'utilise
// que ponctuellement dans ce script, jamais dans le code de l'application.

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const cleServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !cleServiceRole) {
  console.error("Il manque SUPABASE_URL et/ou SUPABASE_SERVICE_ROLE_KEY dans l'environnement.");
  process.exit(1);
}

const supabase = createClient(url, cleServiceRole);
const MOT_DE_PASSE_DEMO = "OptiperfDemo2026!";

const athletes = [
  { nom: "Léa Marchand", email: "lea.demo@optiperf.app", fcMax: 192 },
  { nom: "Sofia Ruiz", email: "sofia.demo@optiperf.app", fcMax: 188 },
  { nom: "Karim Benali", email: "karim.demo@optiperf.app", fcMax: 196 },
  { nom: "Tom Lefèvre", email: "tom.demo@optiperf.app", fcMax: 190 }
];

async function main() {
  const { data: coach, error: erreurCoach } = await supabase.from("users").select("id").eq("role", "coach").limit(1).single();
  if (erreurCoach || !coach) {
    console.error("Aucun coach trouvé. Crée d'abord ton compte coach via /login avant de lancer ce script.");
    process.exit(1);
  }

  for (const athlete of athletes) {
    const { data: cree, error: erreurCreation } = await supabase.auth.admin.createUser({
      email: athlete.email,
      password: MOT_DE_PASSE_DEMO,
      email_confirm: true
    });
    if (erreurCreation || !cree.user) {
      console.error(`Échec création ${athlete.email} :`, erreurCreation?.message);
      continue;
    }

    await supabase.from("users").insert({ id: cree.user.id, email: athlete.email, nom: athlete.nom, role: "athlete" });
    await supabase.from("athlete_profiles").insert({ user_id: cree.user.id, coach_id: coach.id, fc_max: athlete.fcMax });

    console.log(`Créé : ${athlete.nom} <${athlete.email}>`);
  }

  console.log(`\nMot de passe partagé pour tous les comptes de démo : ${MOT_DE_PASSE_DEMO}`);
}

main();
