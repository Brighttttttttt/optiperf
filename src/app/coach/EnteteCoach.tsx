"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconeCloche, IconeMessage } from "@/components/Icones";
import { messagesNonLus } from "@/lib/messagerie";
import { notificationsCoach } from "@/lib/notifications";
import { useVu } from "@/lib/vu-context";

function Pastille({ nombre }: { nombre: number }) {
  if (nombre === 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-corail text-white font-mono text-[10px] leading-[18px] text-center">
      {nombre}
    </span>
  );
}

export default function EnteteCoach() {
  const { estVu } = useVu();
  const pathname = usePathname();
  const nbMessages = messagesNonLus().length;
  const nbNotifications = notificationsCoach(estVu).length;

  const lien = (actif: boolean) =>
    `relative w-10 h-10 rounded-xl border grid place-items-center transition-colors ${
      actif ? "border-corail bg-corailpale text-corailfonce" : "border-bordure bg-carte text-gris hover:text-encre hover:border-gris2"
    }`;

  return (
    <header className="sticky top-0 z-20 bg-sable/90 backdrop-blur border-b border-bordure">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/coach" className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-corail" />
          <span className="text-[15px] font-semibold tracking-tight">Optiperf</span>
        </Link>
        <span className="font-mono text-[10px] tracking-widest uppercase text-gris2 hidden sm:block">Coach</span>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/coach/messagerie"
            aria-label={`Messagerie${nbMessages > 0 ? ` — ${nbMessages} non lus` : ""}`}
            title="Messagerie"
            className={lien(pathname.startsWith("/coach/messagerie"))}
          >
            <IconeMessage className="w-[19px] h-[19px]" />
            <Pastille nombre={nbMessages} />
          </Link>
          <Link
            href="/coach/notifications"
            aria-label={`Notifications${nbNotifications > 0 ? ` — ${nbNotifications} à traiter` : ""}`}
            title="Notifications"
            className={lien(pathname.startsWith("/coach/notifications"))}
          >
            <IconeCloche className="w-[19px] h-[19px]" />
            <Pastille nombre={nbNotifications} />
          </Link>
        </div>
      </div>
    </header>
  );
}
