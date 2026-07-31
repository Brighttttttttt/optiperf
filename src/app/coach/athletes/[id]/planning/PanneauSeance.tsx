"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Activite } from "@/lib/mock";
import { useVu } from "@/lib/vu-context";

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

export default function PanneauSeance({ activite, fermerHref }: { activite: Activite; fermerHref: string }) {
  const { marquerVu } = useVu();

  useEffect(() => {
    marquerVu(activite.id);
  }, [activite.id, marquerVu]);

  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <Link href={fermerHref} className="absolute inset-0 bg-black/40" aria-label="Fermer" />
      <div className="relative w-full max-w-lg bg-encre h-full overflow-y-auto p-6 flex flex-col gap-5 shadow-2xl">
        <Link href={fermerHref} className="font-mono text-[11px] text-[#9A938B] hover:text-[#F5F2ED] w-fit">
          ✕ Fermer
        </Link>
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase text-[#9A938B]">{activite.date}</div>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl font-semibold text-[#F5F2ED] tracking-tight">{activite.titre}</h2>
            <span className="font-mono text-[10px] text-[#8FD3AE] bg-[#2E6B4F]/20 border border-[#8FD3AE]/30 rounded-full px-2.5 py-1">SÉANCE VALIDÉE</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ["Distance", activite.distance],
            ["Durée", activite.duree],
            ["Allure moy.", activite.allure],
            ["FC moyenne", `${activite.fcMoy} bpm`],
            ["D+", activite.dPlus],
            ["RPE ressenti", `${activite.rpe}/10`]
          ].map(([l, v]) => (
            <div key={l} className="bg-[#232120] border border-[#332F2C] rounded-xl p-3.5">
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#8F8880]">{l}</div>
              <div className="font-mono text-xl text-[#F5F2ED] mt-1">{v}</div>
            </div>
          ))}
        </div>
        <BarresZones data={activite.zones} titre="Zones FC — cette séance" />
        <BarresZones data={activite.zonesMoyennes10} titre="Zones FC — moyenne des 10 dernières séances" />
        <p className="font-mono text-[11px] text-[#8F8880]">Les courbes FC/allure/altitude issues du fichier .FIT arrivent en Phase 3 (parsing des fichiers).</p>
      </div>
    </div>
  );
}
