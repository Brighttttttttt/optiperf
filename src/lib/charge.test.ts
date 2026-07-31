import { describe, expect, it } from "vitest";
import { niveauCharge, ratioVolume } from "./charge";

describe("ratioVolume", () => {
  it("lit le volume réalisé et le volume prévu", () => {
    expect(ratioVolume("31 / 62 km")).toBeCloseTo(0.5);
  });

  it("accepte la virgule décimale", () => {
    expect(ratioVolume("30,5 / 61 km")).toBeCloseTo(0.5);
  });

  it("retourne null si le format est inexploitable", () => {
    expect(ratioVolume("repos")).toBeNull();
    expect(ratioVolume("38 / 0 km")).toBeNull();
  });
});

describe("niveauCharge", () => {
  it("classe faible sous 50 % du volume prévu", () => {
    expect(niveauCharge("22 / 46 km")).toBe("faible");
  });

  it("classe normale entre 50 % et 85 %", () => {
    expect(niveauCharge("31 / 58 km")).toBe("normale");
    expect(niveauCharge("38 / 62 km")).toBe("normale");
  });

  it("classe élevée à partir de 85 %", () => {
    expect(niveauCharge("44 / 50 km")).toBe("elevee");
    expect(niveauCharge("60 / 50 km")).toBe("elevee");
  });

  it("retombe sur normale quand le volume est illisible", () => {
    expect(niveauCharge("—")).toBe("normale");
  });
});
