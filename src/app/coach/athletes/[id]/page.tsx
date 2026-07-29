import Link from "next/link";
import { athletes, seances } from "@/lib/mock";
import { zonesFc } from "@/lib/zones";

export default function FicheAthlete({ params }: { params: { id: string } }) {
  const a = athletes.find((x) => x.id === params.id)!;
  const zones = zonesFc(a.fcMax);
  const dernieresSeances = seances
    .filter((s) => s.athleteId === a.id && s.statut !== "prevu")
    .slice()
    .sort((s1, s2) => (s1.jour < s2.jour ? 1 : -1))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="font-mono text-[11px] text-gris">{a.ville} · {a.objectif} · {a.echeance}</div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Volume semaine", a.volumeSemaine],
          ["Adhésion", `${a.adhesion} %`],
          ["RPE moyen", a.rpeMoyen.toFixed(1)]
        ].map(([l, v]) => (
          <div key={l} className="bg-carte border border-bordure rounded-xl p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-gris2">{l}</div>
            <div className="font-mono text-xl mt-1">{v}</div>
          </div>
        ))}
      </div>
      <div className="bg-carte border border-bordure rounded-xl p-5">
        <div className="text-[15px] font-semibold mb-3">Zones FC (auto · 5 zones · FC max {a.fcMax} bpm)</div>
        <div className="flex flex-col gap-2">
          {zones.map(({ zone, pct, lo, hi }) => (
            <div key={zone} className="flex items-center gap-3">
              <div className="font-mono text-xs w-7">{zone}</div>
              <div className="font-mono text-[11px] text-gris w-20">{pct}</div>
              <div className="font-mono text-[13px]">{lo}–{hi} bpm</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-carte border border-bordure rounded-xl overflow-hidden">
        <div className="px-4 py-3.5 border-b border-bordure2 flex items-center justify-between">
          <div className="text-[15px] font-semibold">Dernières séances</div>
          <Link href={`/coach/athletes/${a.id}/planning`} className="font-mono text-[11px] text-gris underline">
            Voir le planning
          </Link>
        </div>
        {dernieresSeances.map((s) => (
          <div key={s.id} className="flex items-center gap-3.5 px-4 py-3 border-b border-bordure2 last:border-0">
            <div className="w-28 font-mono text-[10px] text-gris2">{s.jour}</div>
            <div className="flex-1 text-[13px]">{s.titre}</div>
            {s.statut === "fait" && <span className="font-mono text-[11px] text-vert">Fait{s.rpe ? ` · RPE ${s.rpe}` : ""}</span>}
            {s.statut === "manque" && <span className="font-mono text-[11px] text-corailfonce">Manqué</span>}
          </div>
        ))}
        {dernieresSeances.length === 0 && <div className="px-4 py-6 text-sm text-gris2">Aucune séance réalisée pour l&apos;instant.</div>}
      </div>
      <p className="font-mono text-[11px] text-gris2">Records, notes du coach et historique complet arrivent avec la base de données (Phase 1b).</p>
    </div>
  );
}
