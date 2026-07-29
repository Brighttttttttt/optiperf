import { seances } from "./mock";
import { semaineSuivante } from "./date";

export function semaineSuivanteEstPlanifiee(athleteId: string, aujourdHui: string): boolean {
  const { debut, fin } = semaineSuivante(aujourdHui);
  return seances.some((s) => s.athleteId === athleteId && s.jour >= debut && s.jour <= fin);
}
