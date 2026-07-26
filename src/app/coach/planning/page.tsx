import { seances } from "@/lib/mock";

const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function semaineDates(lundi: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lundi);
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

export default function Planning() {
  const lundis = ["2026-07-20", "2026-07-27", "2026-08-03", "2026-08-10"];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Planning — Léa Marchand</h1>
        <div className="flex items-center gap-3 ml-2">
          <span className="flex items-center gap-1.5 text-xs text-gris"><span className="w-2 h-2 rounded-sm bg-corail" /> Running</span>
          <span className="flex items-center gap-1.5 text-xs text-gris"><span className="w-2 h-2 rounded-sm bg-indigo2" /> Musculation</span>
        </div>
        <button className="ml-auto text-sm font-semibold text-white bg-encre rounded-lg px-3.5 py-2.5">+ Nouvelle séance</button>
      </div>

      <div className="grid grid-cols-[90px_repeat(7,1fr)] gap-2">
        <div />
        {jours.map((j) => (
          <div key={j} className="font-mono text-[10px] tracking-widest uppercase text-gris2 pl-1">{j}</div>
        ))}
        {lundis.map((lundi, wi) => {
          const dates = semaineDates(new Date(lundi));
          return [
            <div key={lundi} className="bg-carte border border-bordure rounded-lg p-2.5">
              <div className="text-[13px] font-semibold">S {30 + wi}</div>
              <div className="font-mono text-[10px] text-gris2">{lundi.slice(8, 10)}/{lundi.slice(5, 7)}</div>
            </div>,
            ...dates.map((d) => {
              const dayS = seances.filter((s) => s.jour === d);
              return (
                <div key={d} className="min-h-[110px] bg-carte border border-bordure2 rounded-lg p-1.5 flex flex-col gap-1.5">
                  <div className="font-mono text-[10px] text-[#C4BDB4] pl-0.5">{Number(d.slice(8, 10))}</div>
                  {dayS.map((s) => (
                    <div key={s.id} className={`border rounded-lg p-2 ${s.type === "running" ? "bg-corailpale border-corailbord" : "bg-indigopale border-indigobord"}`}>
                      <div className="flex justify-between items-center">
                        <div className={`font-mono text-[9px] tracking-wide ${s.type === "running" ? "text-corailfonce" : "text-indigofonce"}`}>{s.categorie}</div>
                        {s.statut === "fait" && <div className="font-mono text-[9px] text-vert">✓</div>}
                        {s.statut === "manque" && <div className="font-mono text-[9px] text-corailfonce">✗</div>}
                      </div>
                      <div className="text-xs font-semibold leading-tight mt-1">{s.titre}</div>
                      <div className="font-mono text-[10px] text-gris mt-0.5">{s.detail}</div>
                    </div>
                  ))}
                </div>
              );
            })
          ];
        })}
      </div>
      <p className="font-mono text-[11px] text-gris2">Le drag &amp; drop et la création de séance arrivent en Phase 2.</p>
    </div>
  );
}
