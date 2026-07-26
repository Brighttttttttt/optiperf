"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { athletes, messages as messagesInitiaux, type Message } from "@/lib/mock";

function MessagerieContenu() {
  const searchParams = useSearchParams();
  const demande = searchParams.get("athlete");
  const initial = athletes.some((a) => a.id === demande) ? (demande as string) : "lea";
  const [athleteId, setAthleteId] = useState(initial);
  const [messages, setMessages] = useState<Message[]>(messagesInitiaux);
  const [texte, setTexte] = useState("");
  const conv = messages.filter((m) => m.athleteId === athleteId);

  function envoyer() {
    if (!texte.trim()) return;
    setMessages([...messages, { id: String(Date.now()), de: "coach", athleteId, texte: texte.trim(), quand: "à l'instant", lu: true }]);
    setTexte("");
  }

  return (
    <div className="bg-carte border border-bordure rounded-xl overflow-hidden flex h-[calc(100vh-3rem)]">
      <div className="w-72 flex-none border-r border-bordure2 flex flex-col">
        <div className="px-4 py-4 border-b border-bordure2 text-base font-semibold">Conversations</div>
        {athletes.map((a) => (
          <button
            key={a.id}
            onClick={() => setAthleteId(a.id)}
            className={`flex items-center gap-3 px-4 py-3 text-left ${a.id === athleteId ? "bg-sable border-l-2 border-corail" : "hover:bg-sable"}`}
          >
            <div className="w-8 h-8 rounded-full bg-bordure flex-none" />
            <div className="text-sm font-semibold">{a.nom}</div>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div data-testid="conversation-titre" className="px-5 py-4 border-b border-bordure2 text-[15px] font-semibold">
          {athletes.find((a) => a.id === athleteId)?.nom}
        </div>
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
          {conv.map((m) => (
            <div key={m.id} className={`max-w-md rounded-xl px-4 py-2.5 text-sm ${m.de === "coach" ? "self-end bg-encre text-white" : "self-start bg-sable border border-bordure"}`}>
              {m.texte}
              <div className={`font-mono text-[10px] mt-1 ${m.de === "coach" ? "text-white/50" : "text-gris2"}`}>{m.quand}</div>
            </div>
          ))}
          {conv.length === 0 && <div className="text-sm text-gris2">Aucun message.</div>}
        </div>
        <div className="p-4 border-t border-bordure2 flex gap-2.5">
          <input
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && envoyer()}
            placeholder="Écrire un message…"
            className="flex-1 bg-sable border border-bordure rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gris2"
          />
          <button onClick={envoyer} className="text-sm font-semibold text-white bg-corail rounded-lg px-4">Envoyer</button>
        </div>
      </div>
    </div>
  );
}

export default function Messagerie() {
  return (
    <Suspense fallback={null}>
      <MessagerieContenu />
    </Suspense>
  );
}
