"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const onglets = [
  { href: "/athlete", label: "Ma semaine" },
  { href: "/athlete/upload", label: "Déposer" },
  { href: "/athlete/historique", label: "Historique" },
  { href: "/athlete/messagerie", label: "Messages" }
];

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <header className="flex items-center gap-2.5 px-4 py-4">
        <div className="w-6 h-6 rounded-md bg-corail" />
        <div className="text-[15px] font-semibold tracking-tight">Optiperf</div>
        <div className="ml-auto font-mono text-[10px] tracking-widest uppercase text-gris2">Athlète</div>
      </header>
      <main className="flex-1 px-4 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-carte border-t border-bordure flex">
        {onglets.map((o) => {
          const actif = o.href === "/athlete" ? pathname === "/athlete" : pathname.startsWith(o.href);
          return (
            <Link key={o.href} href={o.href} className={`flex-1 text-center py-3.5 text-[13px] ${actif ? "font-semibold text-corail" : "text-gris"}`}>
              {o.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
