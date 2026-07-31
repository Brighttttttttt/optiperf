import { describe, expect, it } from "vitest";
import { estDansLeMois, grilleDuMois, jourCourt, lundiDeLaSemaine, semaineSuivante } from "./date";

describe("lundiDeLaSemaine", () => {
  it("retrouve le lundi de la semaine en cours (samedi 25 juillet 2026 → lundi 20 juillet)", () => {
    expect(lundiDeLaSemaine("2026-07-25")).toBe("2026-07-20");
  });

  it("renvoie la même date si on est déjà lundi", () => {
    expect(lundiDeLaSemaine("2026-07-20")).toBe("2026-07-20");
  });
});

describe("semaineSuivante", () => {
  it("calcule la semaine qui suit celle d'aujourd'hui", () => {
    expect(semaineSuivante("2026-07-25")).toEqual({ debut: "2026-07-27", fin: "2026-08-02" });
  });
});

describe("grilleDuMois", () => {
  it("couvre le mois en semaines complètes lundi-dimanche", () => {
    const semaines = grilleDuMois("2026-07-25");
    expect(semaines).toHaveLength(5);
    expect(semaines[0][0]).toBe("2026-06-29");
    const derniereSemaine = semaines[semaines.length - 1];
    expect(derniereSemaine[6]).toBe("2026-08-02");
  });

  it("chaque semaine commence un lundi et fait 7 jours", () => {
    const semaines = grilleDuMois("2026-07-25");
    for (const semaine of semaines) {
      expect(semaine).toHaveLength(7);
      expect(lundiDeLaSemaine(semaine[0])).toBe(semaine[0]);
    }
  });
});

describe("jourCourt", () => {
  it("écrit la date en français abrégé", () => {
    expect(jourCourt("2026-07-21")).toBe("mar. 21 juil.");
  });
});

describe("estDansLeMois", () => {
  it("reconnaît un jour du mois de référence", () => {
    expect(estDansLeMois("2026-07-15", "2026-07-25")).toBe(true);
  });

  it("rejette un jour d'un mois adjacent", () => {
    expect(estDansLeMois("2026-06-29", "2026-07-25")).toBe(false);
  });
});
