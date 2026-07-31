import { activites, athletes, messages } from "./mock";
import { AUJOURDHUI } from "./date";
import { semaineSuivanteEstPlanifiee } from "./planning";

export type TypeNotification = "seance" | "message" | "planification" | "objectif";

export interface Notification {
  id: string;
  type: TypeNotification;
  athleteId: string;
  athleteNom: string;
  titre: string;
  detail: string;
  href: string;
}

// Un objectif est « en approche » à 30 jours ou moins de l'échéance.
export const SEUIL_OBJECTIF_PROCHE = 30;

// Attendu : "J-58 · sub 3:00" ou "J-91".
export function joursAvantEcheance(echeance: string): number | null {
  const trouve = echeance.match(/J-(\d+)/);
  return trouve ? Number(trouve[1]) : null;
}

export function objectifEstProche(echeance: string, seuil: number = SEUIL_OBJECTIF_PROCHE): boolean {
  const jours = joursAvantEcheance(echeance);
  return jours !== null && jours <= seuil;
}

// `estVu` vient du contexte client (Phase 1, pas de backend) : la fonction reste
// pure et testable en lui passant simplement une lambda.
export function notificationsCoach(
  estVu: (activiteId: string) => boolean,
  aujourdHui: string = AUJOURDHUI
): Notification[] {
  const nom = (id: string) => athletes.find((a) => a.id === id)?.nom ?? id;
  const notifs: Notification[] = [];

  for (const act of activites) {
    if (estVu(act.id)) continue;
    notifs.push({
      id: `seance-${act.id}`,
      type: "seance",
      athleteId: act.athleteId,
      athleteNom: nom(act.athleteId),
      titre: "Séance à analyser",
      detail: `${act.titre} · ${act.distance} · RPE ${act.rpe}`,
      href: `/coach/athletes/${act.athleteId}/planning?seance=${act.id}`
    });
  }

  for (const m of messages) {
    if (m.de !== "athlete" || m.lu) continue;
    notifs.push({
      id: `message-${m.id}`,
      type: "message",
      athleteId: m.athleteId,
      athleteNom: nom(m.athleteId),
      titre: "Message reçu",
      detail: m.texte,
      href: `/coach/athletes/${m.athleteId}/messagerie`
    });
  }

  for (const a of athletes) {
    if (semaineSuivanteEstPlanifiee(a.id, aujourdHui)) continue;
    notifs.push({
      id: `planification-${a.id}`,
      type: "planification",
      athleteId: a.id,
      athleteNom: a.nom,
      titre: "Semaine prochaine non planifiée",
      detail: "Aucune séance prévue la semaine prochaine",
      href: `/coach/athletes/${a.id}/planning`
    });
  }

  for (const a of athletes) {
    if (!objectifEstProche(a.echeance)) continue;
    notifs.push({
      id: `objectif-${a.id}`,
      type: "objectif",
      athleteId: a.id,
      athleteNom: a.nom,
      titre: "Objectif en approche",
      detail: `${a.objectif} · ${a.echeance}`,
      href: `/coach/athletes/${a.id}`
    });
  }

  return notifs;
}
