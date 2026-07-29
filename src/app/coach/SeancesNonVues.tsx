"use client";

import Link from "next/link";
import { activites, athletes } from "@/lib/mock";
import { useVu } from "@/lib/vu-context";

export default function SeancesNonVues() {
  const { estVu } = useVu();
  const nonVues = activites.filter((a) => !estVu(a.id));

  return (
    <div className="bg-carte border border-bordure rounded-xl overflow-hidden">
      <div className="px-4 py-3.5 border-b border-bordure2 flex items-center gap-2.5">
        <div className="text-[15px] font-semibold">Séances déposées</div>
        <div className="font-mono text-[10px] text-white bg-corail rounded-full px-2 py-0.5">{nonVues.length} NOUVELLE{nonVues.length > 1 ? "S" : ""}</div>
      </div>
      {nonVues.map((act) => {
        const a = athletes.find((x) => x.id === act.athleteId);
        return (
          <div key={act.id} className="flex items-center gap-3.5 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-bordure flex-none" />
            <div className="w-40">
              <div className="text-sm font-semibold">{a?.nom}</div>
              <div className="font-mono text-[10px] text-gris2">{act.date}</div>
            </div>
            <div className="flex items-center gap-2 w-44">
              <div className="w-2 h-2 rounded-sm bg-corail" />
              <div className="text-[13px]">{act.titre}</div>
            </div>
            <div className="flex gap-4 flex-1 font-mono text-xs">
              <span>{act.distance}</span>
              <span>{act.duree}</span>
              <span>{act.allure}</span>
              <span>{act.fcMoy} bpm</span>
              <span className="text-gris">RPE {act.rpe}</span>
            </div>
            <Link
              href={`/coach/athletes/${act.athleteId}/planning?seance=${act.id}`}
              className="text-xs font-semibold text-white bg-encre rounded-lg px-3 py-2"
            >
              Analyser
            </Link>
          </div>
        );
      })}
      {nonVues.length === 0 && <div className="px-4 py-6 text-sm text-gris2">Aucune nouvelle séance à regarder.</div>}
    </div>
  );
}
