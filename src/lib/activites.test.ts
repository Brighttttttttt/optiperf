import { describe, expect, it } from "vitest";
import { activiteDeLaSeance, activitesDeLAthlete, derniereActivite } from "./activites";

describe("activiteDeLaSeance", () => {
  it("retrouve l'activité déposée pour une séance planifiée", () => {
    expect(activiteDeLaSeance("s1")?.id).toBe("act1");
  });

  it("renvoie undefined si aucune activité n'est rattachée à cette séance", () => {
    expect(activiteDeLaSeance("s3")).toBeUndefined();
  });
});

describe("activitesDeLAthlete", () => {
  it("filtre les activités par athlète", () => {
    const liste = activitesDeLAthlete("lea");
    expect(liste.length).toBeGreaterThan(0);
    expect(liste.every((a) => a.athleteId === "lea")).toBe(true);
  });

  it("renvoie une liste vide pour un athlète sans activité", () => {
    expect(activitesDeLAthlete("karim")).toEqual([]);
  });
});

describe("derniereActivite", () => {
  it("renvoie la première activité de la liste (la plus récente)", () => {
    expect(derniereActivite()?.id).toBe("act1");
  });
});
