"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { athletes } from "@/lib/mock";

const items = [
  { href: "/coach", label: "Tableau de bord" },
  { href: "/coach/planning", label: "Planning" },
  { href: "/coach/analyse", label: "Analyses" },
  { href: "/coach/messagerie", label: "Messagerie" }
];

export default function SidebarCoach() {
  const pathname = usePathname();
  return (
    <aside className="w-56 flex-none bg-carte border-r border-bordure p-4 flex flex-col gap-7 min-h-screen">
      <Link href="/coach" className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-corail" />
        <div className="text-[15px] font-semibold tracking-tight">Optiperf</div>
      </Link>
      <nav className="flex flex-col gap-0.5">
        {items.map((it) => {
          const actif = it.href === "/coach" ? pathname === "/coach" : pathname.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`text-sm px-2.5 py-2 rounded-lg ${actif ? "font-semibold bg-sable2" : "text-gris hover:bg-sable"}`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-2">
        <div className="font-mono text-[10px] tracking-widest uppercase text-gris2">Mes athlètes</div>
        {athletes.map((a) => (
          <Link key={a.id} href={`/coach/athletes/${a.id}`} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-sable">
            <div className="w-6 h-6 rounded-full bg-bordure" />
            <div className="text-[13px] text-gris">{a.nom}</div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
