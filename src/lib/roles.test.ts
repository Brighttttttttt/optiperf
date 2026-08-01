import { describe, expect, it } from "vitest";
import { accueilRole } from "./roles";

describe("accueilRole", () => {
  it("envoie un coach sur /coach", () => {
    expect(accueilRole("coach")).toBe("/coach");
  });

  it("envoie un athlète sur /athlete", () => {
    expect(accueilRole("athlete")).toBe("/athlete");
  });
});
