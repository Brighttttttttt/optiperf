import Link from "next/link";
import { conversations, messagesNonLus } from "@/lib/messagerie";

export default function MessagerieCoach() {
  const fils = conversations();
  const nonLus = messagesNonLus().length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <div>
          <Link href="/coach" className="font-mono text-[11px] text-gris hover:text-encre">
            ← Retour au tableau de bord
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">Messagerie</h1>
        </div>
        <div className="font-mono text-[11px] text-gris sm:ml-auto">
          {nonLus} message{nonLus > 1 ? "s" : ""} non lu{nonLus > 1 ? "s" : ""}
        </div>
      </div>

      <div data-testid="conversations" className="bg-carte border border-bordure rounded-xl overflow-hidden">
        {fils.map(({ athlete, dernier, nonLus: aLire }) => (
          <Link
            key={athlete.id}
            href={`/coach/athletes/${athlete.id}/messagerie`}
            className="flex items-center gap-3.5 px-4 py-3.5 sm:px-5 border-b border-bordure2 last:border-0 hover:bg-sable transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-bordure flex-none" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <div className={`text-sm truncate ${aLire > 0 ? "font-semibold" : "font-medium"}`}>{athlete.nom}</div>
                <div className="font-mono text-[10px] text-gris2 ml-auto flex-none">{dernier?.quand ?? "—"}</div>
              </div>
              <div className={`text-xs truncate mt-0.5 ${aLire > 0 ? "text-encre" : "text-gris"}`}>
                {dernier ? `${dernier.de === "coach" ? "Vous : " : ""}${dernier.texte}` : "Aucun message échangé pour l'instant."}
              </div>
            </div>
            {aLire > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-corail text-white font-mono text-[10px] leading-5 text-center flex-none">
                {aLire}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
