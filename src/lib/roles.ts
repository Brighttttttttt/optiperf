export type Role = "coach" | "athlete";

export function accueilRole(role: Role): string {
  return role === "coach" ? "/coach" : "/athlete";
}
