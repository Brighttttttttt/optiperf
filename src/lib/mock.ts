export type TypeSeance = "running" | "muscu";
export type StatutSeance = "prevu" | "fait" | "manque";

export interface Athlete {
  id: string;
  nom: string;
  ville: string;
  objectif: string;
  echeance: string;
  volumeSemaine: string;
  adhesion: number;
  rpeMoyen: number;
  etat: "DANS LE PLAN" | "FATIGUE" | "À PLANIFIER" | "DOULEUR SIGNALÉE";
  fcMax: number;
}

export interface Seance {
  id: string;
  athleteId: string;
  jour: string; // ISO date
  type: TypeSeance;
  categorie: string; // VMA, SEUIL, ENDURANCE, SORTIE LONGUE, MUSCU...
  titre: string;
  detail: string;
  statut: StatutSeance;
  rpe?: number;
}

export interface Message {
  id: string;
  de: "coach" | "athlete";
  athleteId: string;
  texte: string;
  quand: string;
  lu: boolean;
}

export const athletes: Athlete[] = [
  { id: "lea", nom: "Léa Marchand", ville: "Lyon", objectif: "Marathon Berlin", echeance: "J-58 · sub 3:00", volumeSemaine: "38 / 62 km", adhesion: 92, rpeMoyen: 7.1, etat: "DANS LE PLAN", fcMax: 192 },
  { id: "sofia", nom: "Sofia Ruiz", ville: "Grenoble", objectif: "Trail 42 km", echeance: "J-91", volumeSemaine: "31 / 58 km", adhesion: 64, rpeMoyen: 8.6, etat: "FATIGUE", fcMax: 188 },
  { id: "karim", nom: "Karim Benali", ville: "Paris", objectif: "10 km", echeance: "J-24 · sub 34:00", volumeSemaine: "44 / 50 km", adhesion: 98, rpeMoyen: 7.4, etat: "À PLANIFIER", fcMax: 196 },
  { id: "tom", nom: "Tom Lefèvre", ville: "Nantes", objectif: "Semi-marathon", echeance: "J-45", volumeSemaine: "22 / 46 km", adhesion: 85, rpeMoyen: 6.2, etat: "DOULEUR SIGNALÉE", fcMax: 190 }
];

export const seances: Seance[] = [
  { id: "s1", athleteId: "lea", jour: "2026-07-21", type: "running", categorie: "VMA", titre: "10×400 m", detail: "10,4 km · 50'", statut: "fait", rpe: 8 },
  { id: "s2", athleteId: "lea", jour: "2026-07-22", type: "muscu", categorie: "MUSCU", titre: "Bas du corps", detail: "5 exos · 50'", statut: "fait", rpe: 7 },
  { id: "s3", athleteId: "lea", jour: "2026-07-23", type: "running", categorie: "SEUIL", titre: "3×3000 m", detail: "15 km · 1h10", statut: "prevu" },
  { id: "s4", athleteId: "lea", jour: "2026-07-25", type: "muscu", categorie: "MUSCU", titre: "Gainage + pliométrie", detail: "4 exos · 35'", statut: "prevu" },
  { id: "s5", athleteId: "lea", jour: "2026-07-26", type: "running", categorie: "SORTIE LONGUE", titre: "26 km + 6 km allure", detail: "26 km · 2h10", statut: "prevu" },
  { id: "s6", athleteId: "lea", jour: "2026-07-28", type: "running", categorie: "VMA", titre: "5×1000 m", detail: "12 km · 56'", statut: "prevu" },
  { id: "s7", athleteId: "lea", jour: "2026-07-29", type: "muscu", categorie: "MUSCU", titre: "Haut du corps", detail: "6 exos · 45'", statut: "prevu" },
  { id: "s8", athleteId: "lea", jour: "2026-08-01", type: "running", categorie: "SEUIL", titre: "2×5000 m", detail: "16 km · 1h15", statut: "prevu" },
  { id: "s9", athleteId: "lea", jour: "2026-08-02", type: "running", categorie: "SORTIE LONGUE", titre: "30 km progressif", detail: "30 km · 2h30", statut: "prevu" },
  { id: "s10", athleteId: "lea", jour: "2026-08-07", type: "running", categorie: "VMA", titre: "8×300 m", detail: "9 km · 45'", statut: "prevu" },
  { id: "s11", athleteId: "lea", jour: "2026-08-09", type: "running", categorie: "COURSE", titre: "10 km test", detail: "objectif 38'", statut: "prevu" }
];

export const messages: Message[] = [
  { id: "m1", de: "athlete", athleteId: "lea", texte: "Le dernier 2000 a été très dur, je pense que le vent m'a coûté cher sur le retour.", quand: "09 h 14", lu: false },
  { id: "m2", de: "athlete", athleteId: "sofia", texte: "Je suis en déplacement jeudi et vendredi, on peut décaler ?", quand: "hier", lu: false },
  { id: "m3", de: "athlete", athleteId: "tom", texte: "Petite gêne au mollet droit depuis la séance de VMA.", quand: "hier", lu: false },
  { id: "m4", de: "coach", athleteId: "lea", texte: "Bien vu pour le vent — les allures des 3 premiers étaient parfaites. Récup complète demain.", quand: "09 h 32", lu: true }
];

export const derniereActivite = {
  athleteId: "lea",
  titre: "Seuil 4×2000 m",
  date: "sam. 18 juil. · 07 h 42",
  distance: "14,8 km",
  duree: "1:08:24",
  allure: "4:37/km",
  fcMoy: 158,
  fcMax: 179,
  dPlus: "186 m",
  rpe: 7,
  zones: [
    { zone: "Z1", pct: 18 },
    { zone: "Z2", pct: 24 },
    { zone: "Z3", pct: 20 },
    { zone: "Z4", pct: 30 },
    { zone: "Z5", pct: 8 }
  ],
  zonesMoyennes10: [
    { zone: "Z1", pct: 22 },
    { zone: "Z2", pct: 34 },
    { zone: "Z3", pct: 18 },
    { zone: "Z4", pct: 20 },
    { zone: "Z5", pct: 6 }
  ]
};
