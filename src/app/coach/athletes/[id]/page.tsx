import { athletes } from "@/lib/mock";
import { zonesFc } from "@/lib/zones";
import { libelleCharge, niveauCharge } from "@/lib/charge";

export default function FicheAthlete({ params }: { params: { id: string } }) {
  const a = athletes.find((x) => x.id === params.id)!;
  const zones = zonesFc(a.fcMax);
  const charge = niveauCharge(a.volumeSemaine);

  return (
    <div className="flex flex-col gap-5">
      <div className="font-mono text-[11px] text-gris">
        {a.ville} · {a.objectif} · {a.echeance}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["Volume semaine", a.volumeSemaine],
          ["Adhésion", `${a.adhesion} %`],
          ["RPE moyen", a.rpeMoyen.toFixed(1)],
          ["Charge", libelleCharge[charge]]
        ].map(([l, v]) => (
          <div key={l} className="bg-carte border border-bordure rounded-xl p-4">
            <div className="font-mono text-[10px] tracking-widest uppercase text-gris2">{l}</div>
            <div className="font-mono text-lg sm:text-xl mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="bg-carte border border-bordure rounded-xl p-5 max-w-2xl">
        <div className="text-[15px] font-semibold mb-3">Zones FC (auto · 5 zones · FC max {a.fcMax} bpm)</div>
        <div className="flex flex-col gap-2">
          {zones.map(({ zone, pct, lo, hi }) => (
            <div key={zone} className="flex items-center gap-3">
              <div className="font-mono text-xs w-7">{zone}</div>
              <div className="font-mono text-[11px] text-gris w-20">{pct}</div>
              <div className="font-mono text-[13px]">
                {lo}–{hi} bpm
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-[11px] text-gris2">
        Records et notes du coach arrivent avec la base de données (Phase 1b). L&apos;historique complet des séances est dans
        l&apos;onglet Historique.
      </p>
    </div>
  );
}
