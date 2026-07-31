import { describe, expect, it } from "vitest";
import { conversations, messagesNonLus } from "./messagerie";

describe("messagesNonLus", () => {
  it("ne garde que les messages reçus des athlètes et non lus", () => {
    const nonLus = messagesNonLus();
    expect(nonLus.map((m) => m.id)).toEqual(["m1", "m2", "m3"]);
  });
});

describe("conversations", () => {
  it("crée une conversation par athlète", () => {
    expect(conversations().length).toBe(4);
  });

  it("trie par message le plus récent, athlètes sans message à la fin", () => {
    expect(conversations().map((c) => c.athlete.id)).toEqual(["lea", "tom", "sofia", "karim"]);
  });

  it("retient le dernier message du fil, coach compris", () => {
    const lea = conversations().find((c) => c.athlete.id === "lea");
    expect(lea?.dernier?.id).toBe("m4");
  });

  it("compte les non-lus par conversation", () => {
    const parAthlete = Object.fromEntries(conversations().map((c) => [c.athlete.id, c.nonLus]));
    expect(parAthlete).toEqual({ lea: 1, sofia: 1, tom: 1, karim: 0 });
  });
});
