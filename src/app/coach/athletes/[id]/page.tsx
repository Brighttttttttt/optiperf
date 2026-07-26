import { athletes } from "@/lib/mock";
import { zonesFc } from "@/lib/zones";
import { notFound } from "next/navigation";

export default function FicheAthlete({ params }: { params: { id: string } }) {
  const a = athletes.find((x) => x.id === params.id);
  if (!a) notFound();
  const zones = zonesFc(a.fcMax);
  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-bordure" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{a.nom}</h1>
          <div className="font-mono text-[11px] text-gris">{a.ville} · {a.objectif} · {a.echeance}</div>
        </div>
      </div>
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
      <p className="font-mono text-[11px] text-gris2">Records, notes du coach et historique complet arrivent avec la base de données (Phase 1b).</p>
    </div>
  );
}
