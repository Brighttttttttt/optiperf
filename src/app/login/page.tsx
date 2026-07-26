import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-carte border border-bordure rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-corail" />
          <div className="text-xl font-semibold tracking-tight">Optiperf</div>
        </div>
        <p className="text-sm text-gris">
          Connexion — version de démarrage. L&apos;authentification réelle (Supabase) sera branchée à l&apos;étape suivante.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/coach" className="text-center bg-encre text-white rounded-lg py-3 text-sm font-semibold">
            Entrer comme coach
          </Link>
          <Link href="/athlete" className="text-center border border-bordure rounded-lg py-3 text-sm font-medium">
            Entrer comme athlète
          </Link>
        </div>
      </div>
    </main>
  );
}
