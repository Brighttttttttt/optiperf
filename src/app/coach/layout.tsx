import SidebarCoach from "@/components/SidebarCoach";

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SidebarCoach />
      <main className="flex-1 min-w-0 p-6">{children}</main>
    </div>
  );
}
