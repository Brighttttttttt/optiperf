"use client";

import { useState } from "react";
import { messages as messagesInitiaux, type Message } from "@/lib/mock";

export default function MessagerieAthlete({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>(messagesInitiaux.filter((m) => m.athleteId === params.id));
  const [texte, setTexte] = useState("");

  function envoyer() {
    if (!texte.trim()) return;
    setMessages([
      ...messages,
      {
        id: String(Date.now()),
        de: "coach",
        athleteId: params.id,
        texte: texte.trim(),
        quand: "à l'instant",
        horodatage: new Date().toISOString(),
        lu: true
      }
    ]);
    setTexte("");
  }

  return (
    <div className="bg-carte border border-bordure rounded-xl overflow-hidden flex flex-col h-[calc(100vh-22rem)] min-h-[22rem] max-w-3xl">
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-md rounded-xl px-4 py-2.5 text-sm ${m.de === "coach" ? "self-end bg-encre text-white" : "self-start bg-sable border border-bordure"}`}>
            {m.texte}
            <div className={`font-mono text-[10px] mt-1 ${m.de === "coach" ? "text-white/50" : "text-gris2"}`}>{m.quand}</div>
          </div>
        ))}
        {messages.length === 0 && <div className="text-sm text-gris2">Aucun message.</div>}
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
  );
}
