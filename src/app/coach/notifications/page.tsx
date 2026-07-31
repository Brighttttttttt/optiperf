"use client";

import Link from "next/link";
import { notificationsCoach, type TypeNotification } from "@/lib/notifications";
import { useVu } from "@/lib/vu-context";
import { IconeCalendrier, IconeFiche, IconeHistorique, IconeMessage } from "@/components/Icones";

const style: Record<TypeNotification, { pastille: string; icone: React.ReactNode }> = {
  seance: { pastille: "bg-corailpale border-corailbord text-corailfonce", icone: <IconeHistorique /> },
  message: { pastille: "bg-indigopale border-indigobord text-indigofonce", icone: <IconeMessage /> },
  planification: { pastille: "bg-sable2 border-bordure text-gris", icone: <IconeCalendrier /> },
  objectif: { pastille: "bg-vertpale border-[#C8E2D3] text-vert", icone: <IconeFiche /> }
};

const ordre: TypeNotification[] = ["seance", "message", "planification", "objectif"];

const titreSection: Record<TypeNotification, string> = {
  seance: "Séances à analyser",
  message: "Messages reçus",
  planification: "Semaines à planifier",
  objectif: "Objectifs en approche"
};

export default function Notifications() {
  const { estVu } = useVu();
  const notifs = notificationsCoach(estVu);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <div>
          <Link href="/coach" className="font-mono text-[11px] text-gris hover:text-encre">
            ← Retour au tableau de bord
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">À faire</h1>
        </div>
        <div className="font-mono text-[11px] text-gris sm:ml-auto">
          {notifs.length} tâche{notifs.length > 1 ? "s" : ""} en attente
        </div>
      </div>

      {notifs.length === 0 && (
        <div className="bg-carte border border-bordure rounded-xl px-5 py-8 text-sm text-gris2">Rien à traiter. Tout est à jour.</div>
      )}

      <div data-testid="notifications" className="flex flex-col gap-4">
        {ordre.map((type) => {
          const duType = notifs.filter((n) => n.type === type);
          if (duType.length === 0) return null;
          return (
            <div key={type} className="bg-carte border border-bordure rounded-xl overflow-hidden">
              <div className="px-4 py-3.5 sm:px-5 border-b border-bordure2 flex items-center gap-2.5">
                <div className="text-[15px] font-semibold">{titreSection[type]}</div>
                <div className="font-mono text-[10px] text-white bg-corail rounded-full px-2 py-0.5">{duType.length}</div>
              </div>
              {duType.map((n) => (
                <Link
                  key={n.id}
                  href={n.href}
                  className="flex items-start gap-3.5 px-4 py-3.5 sm:px-5 border-b border-bordure2 last:border-0 hover:bg-sable transition-colors"
                >
                  <span className={`w-9 h-9 rounded-lg border grid place-items-center flex-none ${style[n.type].pastille}`}>
                    {style[n.type].icone}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{n.athleteNom}</div>
                    <div className="text-xs text-gris mt-0.5">{n.detail}</div>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
