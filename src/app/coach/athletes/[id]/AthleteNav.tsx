"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { athletes } from "@/lib/mock";
import { IconeCalendrier, IconeFiche, IconeHistorique, IconeMessage } from "@/components/Icones";

const onglets = [
  { segment: "", label: "Fiche", Icone: IconeFiche },
  { segment: "planning", label: "Planning", Icone: IconeCalendrier },
  { segment: "historique", label: "Historique", Icone: IconeHistorique },
  { segment: "messagerie", label: "Messagerie", Icone: IconeMessage }
];

export default function AthleteNav({ athleteId, athleteNom }: { athleteId: string; athleteNom: string }) {
  const pathname = usePathname();
  const base = `/coach/athletes/${athleteId}`;
  const suffixe = pathname.startsWith(base) ? pathname.slice(base.length) : "";
  const segmentActif = suffixe.replace(/^\//, "").split("/")[0] ?? "";

  return (
    <div className="flex flex-col gap-4">
      <Link href="/coach" className="font-mono text-[11px] text-gris hover:text-encre w-fit">
        ← Retour au tableau de bord
      </Link>

      {/* Passer d'un athlète à l'autre sans repasser par le tableau de bord,
          en restant sur le même onglet. */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mb-1">
        {athletes.map((a) => {
          const actif = a.id === athleteId;
          return (
            <Link
              key={a.id}
              href={`/coach/athletes/${a.id}${suffixe}`}
              aria-current={actif ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full border pl-1 pr-3 py-1 flex-none transition-colors ${
                actif ? "border-corail bg-corailpale text-encre" : "border-bordure bg-carte text-gris hover:border-gris2 hover:text-encre"
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-bordure flex-none" />
              <span className="text-xs font-medium whitespace-nowrap">{a.nom}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-bordure flex-none" />
        <h1 className="text-xl font-semibold tracking-tight">{athleteNom}</h1>
      </div>

      <nav className="flex gap-1 border-b border-bordure2 overflow-x-auto">
        {onglets.map(({ segment, label, Icone }) => {
          const href = `${base}${segment ? `/${segment}` : ""}`;
          const actif = segmentActif === segment;
          return (
            <Link
              key={segment}
              href={href}
              aria-current={actif ? "page" : undefined}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${
                actif ? "border-corail text-encre" : "border-transparent text-gris hover:text-encre"
              }`}
            >
              <Icone />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
