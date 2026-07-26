import { derniereActivite as act } from "@/lib/mock";

function BarresZones({ data, titre }: { data: { zone: string; pct: number }[]; titre: string }) {
  const couleurs = ["#7FA8FF", "#8FD3AE", "#E8C468", "#E9866F", "#D94F32"];
  return (
    <div className="bg-[#232120] border border-[#332F2C] rounded-xl p-4">
      <div className="text-sm font-semibold text-[#F5F2ED] mb-3">{titre}</div>
      <div className="flex flex-col gap-2">
        {data.map((z, i) => (
          <div key={z.zone} className="flex items-center gap-3">
            <div className="font-mono text-xs text-[#9A938B] w-6">{z.zone}</div>
            <div className="flex-1 h-3 bg-[#1A1917] rounded">
              <div className="h-full rounded" style={{ width: `${z.pct}%`, background: couleurs[i] }} />
            </div>
            <div className="font-mono text-xs text-[#F5F2ED] w-10 text-right">{z.pct} %</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Analyse() {
  return (
    <div className="bg-encre -m-6 min-h-screen p-6 flex flex-col gap-5">
      <div>
        <div className="font-mono text-[11px] tracking-widest uppercase text-[#9A938B]">Léa Marchand · {act.date}</div>
        <div className="flex items-center gap-3 mt-1">
          <h1 className="text-2xl font-semibold text-[#F5F2ED] tracking-tight">{act.titre}</h1>
          <span className="font-mono text-[10px] text-[#8FD3AE] bg-[#2E6B4F]/20 border border-[#8FD3AE]/30 rounded-full px-2.5 py-1">SÉANCE VALIDÉE</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
        {[
          ["Distance", act.distance],
          ["Durée", act.duree],
          ["Allure moy.", act.allure],
          ["FC moyenne", `${act.fcMoy} bpm`],
          ["D+", act.dPlus],
          ["RPE ressenti", `${act.rpe}/10`]
        ].map(([l, v]) => (
          <div key={l} className="bg-[#232120] border border-[#332F2C] rounded-xl p-3.5">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#8F8880]">{l}</div>
            <div className="font-mono text-xl text-[#F5F2ED] mt-1">{v}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarresZones data={act.zones} titre="Zones FC — cette séance" />
        <BarresZones data={act.zonesMoyennes10} titre="Zones FC — moyenne des 10 dernières séances" />
      </div>
      <p className="font-mono text-[11px] text-[#8F8880]">Les courbes FC/allure/altitude issues du fichier .FIT arrivent en Phase 3 (parsing des fichiers).</p>
    </div>
  );
}
