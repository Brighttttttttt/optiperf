export type NiveauCharge = "faible" | "normale" | "elevee";

// Charge relative de la semaine en cours = volume réalisé / volume prévu.
// Version simple pour la Phase 1 (données mock) : pas de ratio aigu/chronique,
// juste un niveau lisible d'un coup d'œil dans la liste des athlètes.
// Seuils faciles à ajuster quand les vraies données arriveront (Phase 1b).
const SEUIL_FAIBLE = 0.5;
const SEUIL_ELEVEE = 0.85;

// Attendu : "38 / 62 km". Retourne null si le format n'est pas exploitable.
export function ratioVolume(volumeSemaine: string): number | null {
  const trouve = volumeSemaine.match(/([\d.,]+)\s*\/\s*([\d.,]+)/);
  if (!trouve) return null;

  const realise = Number(trouve[1].replace(",", "."));
  const prevu = Number(trouve[2].replace(",", "."));
  if (!Number.isFinite(realise) || !Number.isFinite(prevu) || prevu <= 0) return null;

  return realise / prevu;
}

export function niveauCharge(volumeSemaine: string): NiveauCharge {
  const ratio = ratioVolume(volumeSemaine);
  if (ratio === null) return "normale";
  if (ratio < SEUIL_FAIBLE) return "faible";
  if (ratio < SEUIL_ELEVEE) return "normale";
  return "elevee";
}

export const libelleCharge: Record<NiveauCharge, string> = {
  faible: "FAIBLE",
  normale: "NORMALE",
  elevee: "ÉLEVÉE"
};
