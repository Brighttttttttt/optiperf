import { describe, expect, it } from "vitest";
import { joursAvantEcheance, notificationsCoach, objectifEstProche } from "./notifications";

const rienDeVu = () => false;
const toutVu = () => true;

describe("joursAvantEcheance", () => {
  it("lit le nombre de jours d'une échéance", () => {
    expect(joursAvantEcheance("J-58 · sub 3:00")).toBe(58);
    expect(joursAvantEcheance("J-91")).toBe(91);
  });

  it("retourne null quand l'échéance n'a pas de compte à rebours", () => {
    expect(joursAvantEcheance("printemps 2027")).toBeNull();
  });
});

describe("objectifEstProche", () => {
  it("retient les échéances à 30 jours ou moins", () => {
    expect(objectifEstProche("J-24 · sub 34:00")).toBe(true);
    expect(objectifEstProche("J-30")).toBe(true);
  });

  it("écarte les échéances lointaines et illisibles", () => {
    expect(objectifEstProche("J-45")).toBe(false);
    expect(objectifEstProche("printemps 2027")).toBe(false);
  });
});

describe("notificationsCoach", () => {
  it("signale les séances déposées non encore regardées", () => {
    const seances = notificationsCoach(rienDeVu).filter((n) => n.type === "seance");
    expect(seances.length).toBeGreaterThan(0);
    expect(seances[0].href).toContain("/planning?seance=");
  });

  it("ne signale plus une séance une fois qu'elle est vue", () => {
    expect(notificationsCoach(toutVu).some((n) => n.type === "seance")).toBe(false);
  });

  it("ne remonte que les messages reçus des athlètes et non lus", () => {
    const recus = notificationsCoach(rienDeVu).filter((n) => n.type === "message");
    expect(recus.length).toBe(3);
    expect(recus.every((n) => n.href.endsWith("/messagerie"))).toBe(true);
  });

  it("signale les athlètes sans séance la semaine suivante", () => {
    const aPlanifier = notificationsCoach(rienDeVu, "2026-07-25").filter((n) => n.type === "planification");
    expect(aPlanifier.map((n) => n.athleteId).sort()).toEqual(["karim", "sofia", "tom"]);
  });

  it("signale les objectifs qui approchent", () => {
    const objectifs = notificationsCoach(rienDeVu).filter((n) => n.type === "objectif");
    expect(objectifs.map((n) => n.athleteId)).toEqual(["karim"]);
  });

  it("donne à chaque notification un identifiant unique", () => {
    const notifs = notificationsCoach(rienDeVu);
    expect(new Set(notifs.map((n) => n.id)).size).toBe(notifs.length);
  });
});
