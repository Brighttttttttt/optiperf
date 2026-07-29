"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { athletes } from "@/lib/mock";

const onglets = [
  { segment: "", label: "Fiche & dashboard" },
  { segment: "planning", label: "Planning" },
  { segment: "messagerie", label: "Messagerie" }
];

export default function AthleteNav({ athleteId, athleteNom }: { athleteId: string; athleteNom: string }) {
  const pathname = usePathname();
  const base = `/coach/athletes/${athleteId}`;
  const suffixe = pathname.startsWith(base) ? pathname.slice(base.length) : "";
  const segmentActif = suffixe.replace(/^\//, "").split("/")[0] ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/coach" className="font-mono text-[11px] text-gris hover:text-encre w-fit">
          ← Retour au tableau de bord
        </Link>
        <div className="flex items-center gap-1.5">
          {athletes.map((a) => (
            <Link
              key={a.id}
              href={`/coach/athletes/${a.id}${suffixe}`}
              title={a.nom}
              className={`w-7 h-7 rounded-full flex-none bg-bordure border-2 ${a.id === athleteId ? "border-corail" : "border-transparent hover:border-gris2"}`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-bordure flex-none" />
        <h1 className="text-xl font-semibold tracking-tight">{athleteNom}</h1>
      </div>
      <nav className="flex gap-1 border-b border-bordure2">
        {onglets.map((o) => {
          const href = `${base}${o.segment ? `/${o.segment}` : ""}`;
          const actif = segmentActif === o.segment;
          return (
            <Link
              key={o.segment}
              href={href}
              className={`px-3.5 py-2.5 text-sm font-medium border-b-2 -mb-px ${actif ? "border-corail text-encre" : "border-transparent text-gris hover:text-encre"}`}
            >
              {o.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
