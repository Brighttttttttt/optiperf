import Link from "next/link";
import { athletes } from "@/lib/mock";
import { libelleCharge, niveauCharge, type NiveauCharge } from "@/lib/charge";
import { IconeCalendrier, IconeFiche, IconeHistorique, IconeMessage } from "@/components/Icones";

const etatStyle: Record<string, string> = {
  "DANS LE PLAN": "text-vert bg-vertpale border-[#C8E2D3]",
  "FATIGUE": "text-corailfonce bg-corailpale border-corailbord",
  "À PLANIFIER": "text-gris bg-sable border-bordure",
  "DOULEUR SIGNALÉE": "text-corailfonce bg-corailpale border-corailbord"
};

const chargeStyle: Record<NiveauCharge, string> = {
  faible: "text-gris bg-sable border-bordure",
  normale: "text-vert bg-vertpale border-[#C8E2D3]",
  elevee: "text-corailfonce bg-corailpale border-corailbord"
};

// Même gabarit pour l'en-tête du tableau et pour chaque ligne, à partir de `lg`.
// En dessous, chaque athlète devient une carte empilée (voir `lg:contents`).
const colonnes =
  "lg:grid lg:gap-4 lg:items-center lg:grid-cols-[minmax(170px,1.4fr)_minmax(150px,1.2fr)_minmax(90px,0.7fr)_minmax(80px,0.6fr)_minmax(70px,0.5fr)_minmax(90px,0.7fr)_minmax(130px,0.9fr)_auto]";

function Metrique({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="lg:hidden font-mono text-[9px] tracking-widest uppercase text-gris2 mb-1">{label}</div>
      {children}
    </div>
  );
}

function ActionAthlete({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-lg border border-bordure bg-carte grid place-items-center text-gris hover:text-encre hover:border-gris2 hover:bg-sable2 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase text-gris2">Samedi 25 juillet</div>
          <h1 className="text-2xl font-semibold tracking-tight">Bonjour Coach</h1>
        </div>
        <div className="font-mono text-[11px] text-gris sm:ml-auto">{athletes.length} athlètes · semaine 30</div>
      </div>

      <div data-testid="mon-ecurie" className="bg-carte border border-bordure rounded-xl overflow-hidden">
        <div
          className={`hidden ${colonnes} px-5 py-2.5 bg-[#FDFCFA] border-b border-bordure2 font-mono text-[9px] tracking-widest uppercase text-gris2`}
        >
          <div>Athlète</div>
          <div>Objectif</div>
          <div>Volume semaine</div>
          <div>Adhésion</div>
          <div>RPE moyen</div>
          <div>Charge</div>
          <div>État</div>
          <div className="text-right">Accès</div>
        </div>

        {athletes.map((a) => {
          const charge = niveauCharge(a.volumeSemaine);
          const base = `/coach/athletes/${a.id}`;
          return (
            <div
              key={a.id}
              data-testid="ligne-athlete"
              className="relative border-b border-bordure2 last:border-0 hover:bg-sable transition-colors"
            >
              {/* Cliquer la ligne (hors boutons) ouvre le planning — un lien en
                  surimpression évite d'imbriquer des <a> les uns dans les autres. */}
              <Link href={`${base}/planning`} aria-label={`Ouvrir le planning de ${a.nom}`} className="absolute inset-0" />

              <div className={`relative pointer-events-none flex flex-col gap-3.5 px-4 py-4 sm:px-5 ${colonnes}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-bordure flex-none" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{a.nom}</div>
                    <div className="font-mono text-[10px] text-gris2">{a.ville}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 lg:contents">
                  <Metrique label="Objectif">
                    <div className="text-xs truncate">{a.objectif}</div>
                    <div className="font-mono text-[10px] text-gris">{a.echeance}</div>
                  </Metrique>
                  <Metrique label="Volume semaine">
                    <div className="font-mono text-[13px]">{a.volumeSemaine}</div>
                  </Metrique>
                  <Metrique label="Adhésion">
                    <div className={`font-mono text-[13px] ${a.adhesion >= 85 ? "text-vert" : "text-corailfonce"}`}>{a.adhesion} %</div>
                  </Metrique>
                  <Metrique label="RPE moyen">
                    <div className={`font-mono text-[13px] ${a.rpeMoyen >= 8 ? "text-corailfonce" : ""}`}>{a.rpeMoyen.toFixed(1)}</div>
                  </Metrique>
                  <Metrique label="Charge">
                    <span className={`inline-block font-mono text-[10px] border rounded-full px-2.5 py-1 ${chargeStyle[charge]}`}>
                      {libelleCharge[charge]}
                    </span>
                  </Metrique>
                  <Metrique label="État">
                    <span className={`inline-block font-mono text-[10px] border rounded-full px-2.5 py-1 ${etatStyle[a.etat]}`}>{a.etat}</span>
                  </Metrique>
                </div>

                <div className="pointer-events-auto flex gap-1.5 lg:justify-end">
                  <ActionAthlete href={base} label={`Fiche de ${a.nom}`}>
                    <IconeFiche />
                  </ActionAthlete>
                  <ActionAthlete href={`${base}/planning`} label={`Planning de ${a.nom}`}>
                    <IconeCalendrier />
                  </ActionAthlete>
                  <ActionAthlete href={`${base}/historique`} label={`Historique de ${a.nom}`}>
                    <IconeHistorique />
                  </ActionAthlete>
                  <ActionAthlete href={`${base}/messagerie`} label={`Messagerie avec ${a.nom}`}>
                    <IconeMessage />
                  </ActionAthlete>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
