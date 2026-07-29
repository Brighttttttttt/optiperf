import { describe, expect, it } from "vitest";
import { semaineSuivanteEstPlanifiee } from "./planning";

describe("semaineSuivanteEstPlanifiee", () => {
  it("est vraie si l'athlète a au moins une séance la semaine suivante", () => {
    expect(semaineSuivanteEstPlanifiee("lea", "2026-07-25")).toBe(true);
  });

  it("est fausse si l'athlète n'a aucune séance du tout", () => {
    expect(semaineSuivanteEstPlanifiee("sofia", "2026-07-25")).toBe(false);
  });
});
