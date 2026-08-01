"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { messageErreurAuth } from "@/lib/auth-errors";
import { accueilRole, type Role } from "@/lib/roles";
import { creerClientNavigateur } from "@/lib/supabase/client";

type Mode = "connexion" | "inscription";

async function recupererRole(supabase: ReturnType<typeof creerClientNavigateur>, userId: string): Promise<Role> {
  const { data, error } = await supabase.from("users").select("role").eq("id", userId).single();
  if (error || !data) throw new Error(error?.message ?? "Impossible de retrouver ton compte.");
  return data.role as Role;
}

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("connexion");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [role, setRole] = useState<Role>("coach");
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function seConnecter() {
    const supabase = creerClientNavigateur();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
    if (error || !data.user) throw new Error(error?.message);

    const roleConnecte = await recupererRole(supabase, data.user.id);
    router.push(accueilRole(roleConnecte));
  }

  async function sInscrire() {
    const supabase = creerClientNavigateur();
    const { data, error } = await supabase.auth.signUp({ email, password: motDePasse });
    if (error || !data.user) throw new Error(error?.message);

    const { error: erreurUser } = await supabase.from("users").insert({ id: data.user.id, email, nom, role });
    if (erreurUser) throw new Error(erreurUser.message);

    if (role === "athlete") {
      const { data: coach, error: erreurCoach } = await supabase.from("users").select("id").eq("role", "coach").limit(1).single();
      if (erreurCoach || !coach) throw new Error("Aucun coach n'existe encore — demande-lui de créer son compte en premier.");

      const { error: erreurProfil } = await supabase.from("athlete_profiles").insert({ user_id: data.user.id, coach_id: coach.id });
      if (erreurProfil) throw new Error(erreurProfil.message);
    }

    router.push(accueilRole(role));
  }

  async function valider(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);
    try {
      if (mode === "connexion") await seConnecter();
      else await sInscrire();
    } catch (err) {
      setErreur(messageErreurAuth(err instanceof Error ? err.message : undefined));
    } finally {
      setEnCours(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-carte border border-bordure rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-corail" />
          <div className="text-xl font-semibold tracking-tight">Optiperf</div>
        </div>

        <div className="flex gap-1 border-b border-bordure2">
          {(["connexion", "inscription"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setErreur(null);
              }}
              className={`px-3.5 py-2.5 text-sm font-medium border-b-2 -mb-px ${
                mode === m ? "border-corail text-encre" : "border-transparent text-gris hover:text-encre"
              }`}
            >
              {m === "connexion" ? "Se connecter" : "Créer un compte"}
            </button>
          ))}
        </div>

        <form onSubmit={valider} className="flex flex-col gap-3.5">
          {mode === "inscription" && (
            <>
              <input
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Nom complet"
                required
                className="bg-sable border border-bordure rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gris2"
              />
              <div className="flex gap-1.5">
                {(["coach", "athlete"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 text-sm rounded-lg py-2.5 border ${
                      role === r ? "border-corail bg-corailpale text-corailfonce font-semibold" : "border-bordure text-gris"
                    }`}
                  >
                    {r === "coach" ? "Coach" : "Athlète"}
                  </button>
                ))}
              </div>
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="bg-sable border border-bordure rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gris2"
          />
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Mot de passe"
            required
            minLength={6}
            className="bg-sable border border-bordure rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gris2"
          />

          {erreur && <p className="text-xs text-corailfonce">{erreur}</p>}

          <button
            type="submit"
            disabled={enCours}
            className="text-center bg-encre text-white rounded-lg py-3 text-sm font-semibold disabled:opacity-60"
          >
            {enCours ? "…" : mode === "connexion" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>
      </div>
    </main>
  );
}
