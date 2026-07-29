import Link from "next/link";
import { athletes, activites, seances } from "@/lib/mock";
import { activiteDeLaSeance } from "@/lib/activites";
import { AUJOURDHUI, estDansLeMois, grilleDuMois, nomMois } from "@/lib/date";
import PanneauSeance from "./PanneauSeance";

const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function Planning({ params, searchParams }: { params: { id: string }; searchParams: { seance?: string } }) {
  const athlete = athletes.find((a) => a.id === params.id)!;
  const seancesAthlete = seances.filter((s) => s.athleteId === athlete.id);
  const semaines = grilleDuMois(AUJOURDHUI);
  const act = searchParams.seance
    ? activites.find((a) => a.id === searchParams.seance && a.athleteId === athlete.id)
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{nomMois(AUJOURDHUI)}</h2>
        <div className="flex items-center gap-3 ml-2">
          <span className="flex items-center gap-1.5 text-xs text-gris"><span className="w-2 h-2 rounded-sm bg-corail" /> Running</span>
          <span className="flex items-center gap-1.5 text-xs text-gris"><span className="w-2 h-2 rounded-sm bg-indigo2" /> Musculation</span>
        </div>
        <button className="ml-auto text-sm font-semibold text-white bg-encre rounded-lg px-3.5 py-2.5">+ Nouvelle séance</button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {jours.map((j) => (
          <div key={j} className="font-mono text-[10px] tracking-widest uppercase text-gris2 pl-1">{j}</div>
        ))}
        {semaines.flatMap((semaine) =>
          semaine.map((d) => {
            const dansLeMois = estDansLeMois(d, AUJOURDHUI);
            const dayS = seancesAthlete.filter((s) => s.jour === d);
            return (
              <div
                key={d}
                className={`min-h-[100px] border border-bordure2 rounded-lg p-1.5 flex flex-col gap-1.5 ${dansLeMois ? "bg-carte" : "bg-sable2"}`}
              >
                <div className={`font-mono text-[10px] pl-0.5 ${dansLeMois ? "text-[#C4BDB4]" : "text-[#E4DFD8]"}`}>{Number(d.slice(8, 10))}</div>
                {dayS.map((s) => {
                  const activite = s.statut === "fait" ? activiteDeLaSeance(s.id) : undefined;
                  const classe = `block border rounded-lg p-2 ${s.type === "running" ? "bg-corailpale border-corailbord" : "bg-indigopale border-indigobord"} ${activite ? "hover:brightness-95 cursor-pointer" : ""}`;
                  const contenu = (
                    <>
                      <div className="flex justify-between items-center">
                        <div className={`font-mono text-[9px] tracking-wide ${s.type === "running" ? "text-corailfonce" : "text-indigofonce"}`}>{s.categorie}</div>
                        {s.statut === "fait" && <div className="font-mono text-[9px] text-vert">✓</div>}
                        {s.statut === "manque" && <div className="font-mono text-[9px] text-corailfonce">✗</div>}
                      </div>
                      <div className="text-xs font-semibold leading-tight mt-1">{s.titre}</div>
                      <div className="font-mono text-[10px] text-gris mt-0.5">{s.detail}</div>
                    </>
                  );
                  return activite ? (
                    <Link key={s.id} href={`/coach/athletes/${athlete.id}/planning?seance=${activite.id}`} className={classe}>
                      {contenu}
                    </Link>
                  ) : (
                    <div key={s.id} className={classe}>
                      {contenu}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
      <p className="font-mono text-[11px] text-gris2">Le drag &amp; drop et la création de séance arrivent en Phase 2.</p>

      {act && <PanneauSeance activite={act} fermerHref={`/coach/athletes/${athlete.id}/planning`} />}
    </div>
  );
}
