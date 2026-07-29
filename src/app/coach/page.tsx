import Link from "next/link";
import { athletes, messages } from "@/lib/mock";
import { AUJOURDHUI } from "@/lib/date";
import { semaineSuivanteEstPlanifiee } from "@/lib/planning";
import SeancesNonVues from "./SeancesNonVues";

const etatStyle: Record<string, string> = {
  "DANS LE PLAN": "text-vert bg-vertpale border-[#C8E2D3]",
  "FATIGUE": "text-corailfonce bg-corailpale border-corailbord",
  "À PLANIFIER": "text-gris bg-sable border-bordure",
  "DOULEUR SIGNALÉE": "text-corailfonce bg-corailpale border-corailbord"
};

export default function Dashboard() {
  const nonLus = messages.filter((m) => !m.lu);
  const athletesSansSemaineSuivante = athletes.filter((a) => !semaineSuivanteEstPlanifiee(a.id, AUJOURDHUI));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase text-gris2">Samedi 25 juillet</div>
          <h1 className="text-2xl font-semibold tracking-tight">Bonjour Coach</h1>
        </div>
        <div className="ml-auto flex gap-2.5">
          {[
            ["Athlètes actifs", String(athletes.length)],
            ["Semaines à planifier", String(athletesSansSemaineSuivante.length)]
          ].map(([l, v]) => (
            <div key={l} className="bg-carte border border-bordure rounded-xl px-4 py-2.5">
              <div className="font-mono text-[10px] tracking-widest uppercase text-gris2">{l}</div>
              <div className="font-mono text-lg">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4 items-start">
        <SeancesNonVues />

        <div className="bg-carte border border-bordure rounded-xl overflow-hidden">
          <div className="px-4 py-3.5 border-b border-bordure2 flex items-center gap-2.5">
            <div className="text-[15px] font-semibold">Messages non lus</div>
            <div className="font-mono text-[10px] text-white bg-corail rounded-full px-2 py-0.5">{nonLus.length}</div>
          </div>
          {nonLus.map((m) => {
            const a = athletes.find((x) => x.id === m.athleteId);
            return (
              <Link key={m.id} href={`/coach/athletes/${m.athleteId}/messagerie`} className="flex gap-3 px-4 py-3 border-b border-bordure2 last:border-0 hover:bg-sable">
                <div className="w-7 h-7 rounded-full bg-bordure flex-none" />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <div className="text-[13px] font-semibold">{a?.nom}</div>
                    <div className="font-mono text-[10px] text-gris2">{m.quand}</div>
                  </div>
                  <div className="text-xs text-gris truncate">{m.texte}</div>
                </div>
              </Link>
            );
          })}
          {nonLus.length === 0 && <div className="px-4 py-6 text-sm text-gris2">Aucun message non lu.</div>}
        </div>
      </div>

      {athletesSansSemaineSuivante.length > 0 && (
        <div data-testid="semaine-non-planifiee" className="bg-carte border border-corailbord rounded-xl overflow-hidden">
          <div className="px-4 py-3.5 border-b border-bordure2 flex items-center gap-2.5">
            <div className="text-[15px] font-semibold">Semaine prochaine non planifiée</div>
            <div className="font-mono text-[10px] text-white bg-corail rounded-full px-2 py-0.5">{athletesSansSemaineSuivante.length}</div>
          </div>
          {athletesSansSemaineSuivante.map((a) => (
            <Link key={a.id} href={`/coach/athletes/${a.id}/planning`} className="flex items-center gap-3.5 px-4 py-3 border-b border-bordure2 last:border-0 hover:bg-sable">
              <div className="w-7 h-7 rounded-full bg-bordure flex-none" />
              <div className="text-sm font-semibold">{a.nom}</div>
              <div className="font-mono text-[11px] text-gris ml-auto">Rien de planifié la semaine prochaine</div>
            </Link>
          ))}
        </div>
      )}

      <div data-testid="mon-ecurie" className="bg-carte border border-bordure rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-bordure2 flex items-center gap-3.5">
          <div>
            <div className="text-lg font-semibold tracking-tight">Mon écurie</div>
            <div className="font-mono text-[11px] text-gris">{athletes.length} athlètes · semaine 30</div>
          </div>
        </div>
        <div className="grid grid-cols-[220px_170px_150px_110px_100px_1fr] gap-3.5 px-5 py-2.5 bg-[#FDFCFA] border-b border-bordure2 font-mono text-[9px] tracking-widest uppercase text-gris2">
          <div>Athlète</div><div>Objectif</div><div>Volume semaine</div><div>Adhésion</div><div>RPE moyen</div><div>État</div>
        </div>
        {athletes.map((a) => (
          <Link key={a.id} href={`/coach/athletes/${a.id}`} className="grid grid-cols-[220px_170px_150px_110px_100px_1fr] gap-3.5 px-5 py-3 border-b border-bordure2 last:border-0 items-center hover:bg-sable">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-bordure" />
              <div>
                <div className="text-sm font-semibold">{a.nom}</div>
                <div className="font-mono text-[10px] text-gris2">{a.ville}</div>
              </div>
            </div>
            <div>
              <div className="text-xs">{a.objectif}</div>
              <div className="font-mono text-[10px] text-gris">{a.echeance}</div>
            </div>
            <div className="font-mono text-[13px]">{a.volumeSemaine}</div>
            <div className={`font-mono text-[13px] ${a.adhesion >= 85 ? "text-vert" : "text-corailfonce"}`}>{a.adhesion} %</div>
            <div className={`font-mono text-[13px] ${a.rpeMoyen >= 8 ? "text-corailfonce" : ""}`}>{a.rpeMoyen.toFixed(1)}</div>
            <div>
              <span className={`font-mono text-[10px] border rounded-full px-2.5 py-1 ${etatStyle[a.etat]}`}>{a.etat}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
