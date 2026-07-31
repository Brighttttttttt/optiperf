import { athletes, messages, type Athlete, type Message } from "./mock";

export interface Conversation {
  athlete: Athlete;
  dernier?: Message;
  nonLus: number;
}

export function messagesNonLus(): Message[] {
  return messages.filter((m) => m.de === "athlete" && !m.lu);
}

// Une conversation par athlète, la plus récemment active en premier.
// Les athlètes sans aucun message ferment la marche.
export function conversations(): Conversation[] {
  return athletes
    .map((athlete) => {
      const fil = messages
        .filter((m) => m.athleteId === athlete.id)
        .slice()
        .sort((a, b) => (a.horodatage < b.horodatage ? 1 : -1));
      return {
        athlete,
        dernier: fil[0],
        nonLus: fil.filter((m) => m.de === "athlete" && !m.lu).length
      };
    })
    .sort((a, b) => {
      const ha = a.dernier?.horodatage ?? "";
      const hb = b.dernier?.horodatage ?? "";
      if (ha === hb) return 0;
      return ha < hb ? 1 : -1;
    });
}
