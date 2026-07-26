import { seances } from "@/lib/mock";

export default function Historique() {
  const passees = seances
    .filter((s) => s.statut !== "prevu")
    .slice()
    .sort((a, b) => (a.jour < b.jour ? 1 : -1));

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold tracking-tight">Historique de mes séances</h1>
      {passees.map((s) => (
        <div key={s.id} className={`border rounded-xl p-4 ${s.type === "running" ? "bg-corailpale border-corailbord" : "bg-indigopale border-indigobord"}`}>
          <div className="flex items-center justify-between">
            <div className={`font-mono text-[10px] tracking-wide ${s.type === "running" ? "text-corailfonce" : "text-indigofonce"}`}>
              {s.jour} · {s.categorie}
            </div>
            {s.statut === "fait" && <span className="font-mono text-[11px] text-vert">Fait ✓{s.rpe ? ` · RPE ${s.rpe}` : ""}</span>}
            {s.statut === "manque" && <span className="font-mono text-[11px] text-corailfonce">Manqué ✗</span>}
          </div>
          <div className="text-[15px] font-semibold mt-1.5">{s.titre}</div>
          <div className="font-mono text-xs text-gris mt-0.5">{s.detail}</div>
        </div>
      ))}
      {passees.length === 0 && <p className="font-mono text-[11px] text-gris2">Aucune séance passée pour l&apos;instant.</p>}
    </div>
  );
}
