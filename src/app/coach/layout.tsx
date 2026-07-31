import EnteteCoach from "./EnteteCoach";

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <EnteteCoach />
      <main className="flex-1 w-full px-4 py-5 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
