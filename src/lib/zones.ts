export interface ZoneFc {
  zone: string;
  pct: string;
  lo: number;
  hi: number;
}

const BORNES = [
  ["Z1", 0.5, 0.6],
  ["Z2", 0.6, 0.7],
  ["Z3", 0.7, 0.8],
  ["Z4", 0.8, 0.9],
  ["Z5", 0.9, 1]
] as const;

export function zonesFc(fcMax: number): ZoneFc[] {
  return BORNES.map(([zone, min, max]) => ({
    zone,
    pct: `${Math.round(min * 100)}–${Math.round(max * 100)} %`,
    lo: Math.round(fcMax * min),
    hi: Math.round(fcMax * max)
  }));
}
