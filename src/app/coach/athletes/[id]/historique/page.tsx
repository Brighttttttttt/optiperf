import Link from "next/link";
import { athletes, seances } from "@/lib/mock";
import { activiteDeLaSeance } from "@/lib/activites";
import { jourCourt } from "@/lib/date";

export default function HistoriqueAthlete({ params }: { params: { id: string } }) {
  const athlete = athletes.find((x) => x.id === params.id)!;
  const historique = seances
    .filter((s) => s.athleteId === athlete.id)
    .slice()
    .sort((a, b) => (a.jour < b.jour ? 1 : -1));

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">Historique des séances</h2>

      <div data-testid="historique-seances" className="bg-carte border border-bordure rounded-xl overflow-hidden">
        {historique.map((s) => {
          const activite = s.statut === "fait" ? activiteDeLaSeance(s.id) : undefined;
          const contenu = (
            <>
              <div className="font-mono text-[11px] text-gris2 w-full sm:w-28 flex-none">{jourCourt(s.jour)}</div>
              <div className="flex items-center gap-2 w-full sm:w-52 flex-none">
                <span className={`w-2 h-2 rounded-sm flex-none ${s.type === "running" ? "bg-corail" : "bg-indigo2"}`} />
                <span className="text-[13px] font-semibold truncate">{s.titre}</span>
              </div>
              <div className="font-mono text-[11px] text-gris flex-1">
                {s.categorie} · {s.detail}
              </div>
              <div className="font-mono text-[11px] flex-none">
                {s.statut === "fait" && <span className="text-vert">Fait{s.rpe ? ` · RPE ${s.rpe}` : ""}</span>}
                {s.statut === "manque" && <span className="text-corailfonce">Manqué</span>}
                {s.statut === "prevu" && <span className="text-gris2">Prévu</span>}
              </div>
            </>
          );
          const classes =
            "flex flex-wrap sm:flex-nowrap items-center gap-x-3.5 gap-y-1.5 px-4 py-3.5 sm:px-5 border-b border-bordure2 last:border-0";

          return activite ? (
            <Link
              key={s.id}
              href={`/coach/athletes/${athlete.id}/planning?seance=${activite.id}`}
              className={`${classes} hover:bg-sable transition-colors`}
            >
              {contenu}
            </Link>
          ) : (
            <div key={s.id} className={classes}>
              {contenu}
            </div>
          );
        })}
        {historique.length === 0 && <div className="px-5 py-8 text-sm text-gris2">Aucune séance pour cet athlète.</div>}
      </div>

      <p className="font-mono text-[11px] text-gris2">Les séances analysées s&apos;ouvrent dans le planning.</p>
    </div>
  );
}
