import { describe, expect, it } from "vitest";
import { messageErreurAuth } from "./auth-errors";

describe("messageErreurAuth", () => {
  it("traduit les identifiants invalides", () => {
    expect(messageErreurAuth("Invalid login credentials")).toBe("E-mail ou mot de passe incorrect.");
  });

  it("traduit un e-mail déjà utilisé", () => {
    expect(messageErreurAuth("User already registered")).toBe("Un compte existe déjà avec cet e-mail.");
  });

  it("traduit un mot de passe trop court", () => {
    expect(messageErreurAuth("Password should be at least 6 characters")).toBe("Le mot de passe doit faire au moins 6 caractères.");
  });

  it("traduit un e-mail invalide", () => {
    expect(messageErreurAuth("Unable to validate email address: invalid format")).toBe("Adresse e-mail invalide.");
  });

  it("laisse passer un message inconnu tel quel", () => {
    expect(messageErreurAuth("Something unexpected happened")).toBe("Something unexpected happened");
  });

  it("donne un message générique si rien n'est fourni", () => {
    expect(messageErreurAuth(undefined)).toBe("Une erreur est survenue. Réessaie.");
  });
});
