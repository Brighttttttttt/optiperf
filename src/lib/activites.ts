import { activites, type Activite } from "./mock";

export function activiteDeLaSeance(seanceId: string): Activite | undefined {
  return activites.find((a) => a.seanceId === seanceId);
}

export function activitesDeLAthlete(athleteId: string): Activite[] {
  return activites.filter((a) => a.athleteId === athleteId);
}

export function derniereActivite(): Activite | undefined {
  return activites[0];
}
