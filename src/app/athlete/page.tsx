import Link from "next/link";
import { seances } from "@/lib/mock";

export default function MaSemaine() {
  const semaine = seances.filter((s) => s.jour >= "2026-07-20" && s.jour <= "2026-07-26");
  const noms = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold tracking-tight">Ma semaine</h1>
      <div className="font-mono text-[11px] text-gris">20 – 26 juillet · semaine 30</div>
      {semaine.map((s) => {
        const d = new Date(s.jour + "T12:00:00");
        return (
          <div key={s.id} className={`border rounded-xl p-4 ${s.type === "running" ? "bg-corailpale border-corailbord" : "bg-indigopale border-indigobord"}`}>
            <div className="flex items-center justify-between">
              <div className={`font-mono text-[10px] tracking-wide ${s.type === "running" ? "text-corailfonce" : "text-indigofonce"}`}>
                {noms[d.getDay()]} {d.getDate()} · {s.categorie}
              </div>
              {s.statut === "fait" && <span className="font-mono text-[11px] text-vert">Fait ✓{s.rpe ? ` · RPE ${s.rpe}` : ""}</span>}
              {s.statut === "prevu" && <span className="font-mono text-[11px] text-gris2">À faire</span>}
              {s.statut === "manque" && <span className="font-mono text-[11px] text-corailfonce">Manqué ✗</span>}
            </div>
            <div className="text-[15px] font-semibold mt-1.5">{s.titre}</div>
            <div className="font-mono text-xs text-gris mt-0.5">{s.detail}</div>
            {s.statut === "prevu" && (
              <Link href="/athlete/upload" className="inline-block mt-3 text-[13px] font-semibold text-white bg-corail rounded-lg px-3.5 py-2">
                Déposer ma séance
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
