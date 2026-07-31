"use client";

import { useState } from "react";
import { messages as messagesInitiaux, type Message } from "@/lib/mock";

export default function MessagerieAthlete() {
  const [messages, setMessages] = useState<Message[]>(messagesInitiaux.filter((m) => m.athleteId === "lea"));
  const [texte, setTexte] = useState("");

  function envoyer() {
    if (!texte.trim()) return;
    setMessages([
      ...messages,
      {
        id: String(Date.now()),
        de: "athlete",
        athleteId: "lea",
        texte: texte.trim(),
        quand: "à l'instant",
        horodatage: new Date().toISOString(),
        lu: true
      }
    ]);
    setTexte("");
  }

  return (
    <div className="flex flex-col gap-3 h-[calc(100vh-10rem)]">
      <h1 className="text-xl font-semibold tracking-tight">Coach Marc</h1>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${m.de === "athlete" ? "self-end bg-corail text-white" : "self-start bg-carte border border-bordure"}`}>
            {m.texte}
            <div className={`font-mono text-[10px] mt-1 ${m.de === "athlete" ? "text-white/60" : "text-gris2"}`}>{m.quand}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && envoyer()}
          placeholder="Écrire au coach…"
          className="flex-1 bg-carte border border-bordure rounded-xl px-4 py-3 text-sm outline-none focus:border-gris2"
        />
        <button onClick={envoyer} className="text-sm font-semibold text-white bg-corail rounded-xl px-4">Envoyer</button>
      </div>
    </div>
  );
}
