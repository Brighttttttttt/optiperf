// Date fixe pour la démo (Phase 1, pas encore de backend) — cohérente avec les
// séances mock de juillet/août 2026. À remplacer par la vraie date en Phase 1b (Supabase).
export const AUJOURDHUI = "2026-07-25";

function parseISO(dateISO: string): Date {
  return new Date(dateISO + "T12:00:00");
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function lundiDeLaSemaine(dateISO: string): string {
  const d = parseISO(dateISO);
  const decalage = (d.getDay() + 6) % 7; // lundi = 0
  d.setDate(d.getDate() - decalage);
  return toISO(d);
}

export function semaineSuivante(dateISO: string): { debut: string; fin: string } {
  const lundi = parseISO(lundiDeLaSemaine(dateISO));
  lundi.setDate(lundi.getDate() + 7);
  const dimanche = new Date(lundi);
  dimanche.setDate(dimanche.getDate() + 6);
  return { debut: toISO(lundi), fin: toISO(dimanche) };
}

// Grille du mois contenant `dateISO`, en semaines complètes lundi-dimanche
// (inclut les jours des mois adjacents nécessaires pour compléter la grille).
export function grilleDuMois(dateISO: string): string[][] {
  const d = parseISO(dateISO);
  const premierJour = toISO(new Date(d.getFullYear(), d.getMonth(), 1));
  const dernierJour = toISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
  const debut = parseISO(lundiDeLaSemaine(premierJour));
  const fin = parseISO(lundiDeLaSemaine(dernierJour));
  fin.setDate(fin.getDate() + 6);

  const semaines: string[][] = [];
  const curseur = new Date(debut);
  while (curseur <= fin) {
    const semaine: string[] = [];
    for (let i = 0; i < 7; i++) {
      semaine.push(toISO(curseur));
      curseur.setDate(curseur.getDate() + 1);
    }
    semaines.push(semaine);
  }
  return semaines;
}

export function estDansLeMois(dateISO: string, moisDeReference: string): boolean {
  const d = parseISO(dateISO);
  const ref = parseISO(moisDeReference);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}

export function nomMois(dateISO: string): string {
  const texte = parseISO(dateISO).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}
