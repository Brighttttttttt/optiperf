import { athletes } from "@/lib/mock";
import { notFound } from "next/navigation";
import AthleteNav from "./AthleteNav";

export default function AthleteLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const athlete = athletes.find((a) => a.id === params.id);
  if (!athlete) notFound();
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-5">
      <AthleteNav athleteId={athlete.id} athleteNom={athlete.nom} />
      {children}
    </div>
  );
}
