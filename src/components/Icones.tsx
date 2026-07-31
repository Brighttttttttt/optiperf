// Icônes en SVG inline : le projet n'a pas de librairie d'icônes et n'en a pas
// besoin pour les quelques pictogrammes de la navigation coach.

type Props = { className?: string };

function Svg({ className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "w-[18px] h-[18px]"}
    >
      {children}
    </svg>
  );
}

export function IconeFiche(props: Props) {
  return (
    <Svg {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Svg>
  );
}

export function IconeCalendrier(props: Props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18" />
    </Svg>
  );
}

export function IconeHistorique(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 3.5v5h5" />
      <path d="M3.5 13a8.5 8.5 0 1 0 2.4-6.8L3 8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </Svg>
  );
}

export function IconeMessage(props: Props) {
  return (
    <Svg {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-9.1 8.5 8.4 8.4 0 0 1-3.4-.8L3 21l1.8-5.5a8.4 8.4 0 0 1-.8-3.5 8.5 8.5 0 0 1 8.5-8.5h.5a8.5 8.5 0 0 1 8 8z" />
    </Svg>
  );
}

export function IconeCloche(props: Props) {
  return (
    <Svg {...props}>
      <path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-3 8.5-3 8.5h18s-3-2-3-8.5" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Svg>
  );
}
