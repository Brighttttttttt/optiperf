"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { creerClientNavigateur } from "@/lib/supabase/client";

export default function BoutonDeconnexion() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = creerClientNavigateur();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  if (!email) return null;

  async function deconnexion() {
    const supabase = creerClientNavigateur();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] text-gris2 hidden md:inline truncate max-w-[140px]">{email}</span>
      <button onClick={deconnexion} className="font-mono text-[11px] text-gris hover:text-encre">
        Déconnexion
      </button>
    </div>
  );
}
