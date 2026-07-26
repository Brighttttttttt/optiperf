import { describe, expect, it } from "vitest";
import { zonesFc } from "./zones";

describe("zonesFc", () => {
  it("calcule les 5 zones à partir de la FC max", () => {
    const zones = zonesFc(200);
    expect(zones).toHaveLength(5);
    expect(zones[0]).toEqual({ zone: "Z1", pct: "50–60 %", lo: 100, hi: 120 });
    expect(zones[4]).toEqual({ zone: "Z5", pct: "90–100 %", lo: 180, hi: 200 });
  });

  it("arrondit les bornes au bpm le plus proche", () => {
    const zones = zonesFc(191);
    expect(zones[2]).toEqual({ zone: "Z3", pct: "70–80 %", lo: 134, hi: 153 });
  });
});
