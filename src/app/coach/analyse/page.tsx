import Link from "next/link";
import { activites, athletes } from "@/lib/mock";

export default function AnalysesListe({ searchParams }: { searchParams: { athlete?: string } }) {
  const athlete = searchParams.athlete ? athletes.find((a) => a.id === searchParams.athlete) : undefined;
  const liste = athlete ? activites.filter((a) => a.athleteId === athlete.id) : activites;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Analyses{athlete ? ` — ${athlete.nom}` : ""}</h1>
        {athlete && (
          <Link href="/coach/analyse" className="font-mono text-[11px] text-gris underline">
            Voir toutes les analyses
          </Link>
        )}
      </div>
      <div className="bg-carte border border-bordure rounded-xl overflow-hidden">
        {liste.map((act) => {
          const a = athletes.find((x) => x.id === act.athleteId);
          return (
            <Link
              key={act.id}
              href={`/coach/analyse/${act.id}`}
              className="flex items-center gap-3.5 px-4 py-3 border-b border-bordure2 last:border-0 hover:bg-sable"
            >
              <div className="w-8 h-8 rounded-full bg-bordure flex-none" />
              <div className="w-40">
                <div className="text-sm font-semibold">{a?.nom}</div>
                <div className="font-mono text-[10px] text-gris2">{act.date}</div>
              </div>
              <div className="text-[13px] flex-1">{act.titre}</div>
              <div className="flex gap-4 font-mono text-xs text-gris">
                <span>{act.distance}</span>
                <span>{act.duree}</span>
                <span>RPE {act.rpe}</span>
              </div>
            </Link>
          );
        })}
        {liste.length === 0 && <div className="px-4 py-6 text-sm text-gris2">Aucune séance analysée pour l&apos;instant.</div>}
      </div>
    </div>
  );
}
