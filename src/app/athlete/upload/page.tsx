"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { seances } from "@/lib/mock";

function UploadForm() {
  const [fichier, setFichier] = useState<File | null>(null);
  const [rpe, setRpe] = useState(6);
  const [commentaire, setCommentaire] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const seance = seances.find((s) => s.id === searchParams.get("seance"));

  function envoyer() {
    setEnvoye(true);
    setTimeout(() => router.push("/athlete"), 1200);
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href="/athlete" className="font-mono text-[11px] text-gris hover:text-corail w-fit">
        ← Annuler
      </Link>
      <h1 className="text-xl font-semibold tracking-tight">Déposer ma séance</h1>
      {seance ? (
        <div className="bg-carte border border-bordure rounded-xl p-3.5">
          <div className="font-mono text-[10px] tracking-widest uppercase text-gris2">{seance.categorie}</div>
          <div className="text-sm font-semibold mt-0.5">{seance.titre}</div>
          <div className="font-mono text-[11px] text-gris mt-0.5">{seance.detail}</div>
        </div>
      ) : (
        <p className="font-mono text-[11px] text-gris2">Séance libre (non rattachée au planning).</p>
      )}
      <label className="border-2 border-dashed border-bordure rounded-xl p-8 text-center cursor-pointer bg-carte">
        <input type="file" accept=".fit" className="hidden" onChange={(e) => setFichier(e.target.files?.[0] ?? null)} />
        <div className="text-sm font-medium">{fichier ? fichier.name : "Choisir mon fichier .FIT"}</div>
        <div className="font-mono text-[11px] text-gris2 mt-1.5">Export Garmin (montre ou Garmin Connect)</div>
      </label>
      <div className="bg-carte border border-bordure rounded-xl p-4">
        <div className="text-sm font-semibold mb-2.5">Effort ressenti (RPE) : <span className="font-mono">{rpe}/10</span></div>
        <input type="range" min={1} max={10} value={rpe} onChange={(e) => setRpe(Number(e.target.value))} className="w-full accent-[#D94F32]" />
      </div>
      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Commentaire pour le coach (sensations, météo, douleurs…)"
        className="bg-carte border border-bordure rounded-xl p-4 text-sm min-h-24 outline-none focus:border-gris2"
      />
      <button onClick={envoyer} disabled={envoye} className="bg-corail text-white rounded-xl py-3.5 text-[15px] font-semibold disabled:opacity-60">
        {envoye ? "Envoyé au coach ✓" : "Envoyer au coach"}
      </button>
      <p className="font-mono text-[11px] text-gris2">Le fichier sera réellement stocké et analysé en Phase 3.</p>
    </div>
  );
}

export default function Upload() {
  return (
    <Suspense fallback={null}>
      <UploadForm />
    </Suspense>
  );
}
