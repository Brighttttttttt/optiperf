// Traduit les messages d'erreur Supabase Auth (toujours en anglais) en français.
// Les messages exacts renvoyés par Supabase ne sont pas garantis stables d'une
// version à l'autre : on matche sur des fragments plutôt que l'égalité stricte.
export function messageErreurAuth(messageBrut?: string): string {
  if (!messageBrut) return "Une erreur est survenue. Réessaie.";

  const m = messageBrut.toLowerCase();

  if (m.includes("invalid login credentials")) return "E-mail ou mot de passe incorrect.";
  if (m.includes("already registered") || m.includes("already exists") || m.includes("user already"))
    return "Un compte existe déjà avec cet e-mail.";
  if (m.includes("password should be at least")) return "Le mot de passe doit faire au moins 6 caractères.";
  if (m.includes("unable to validate email") || m.includes("invalid email")) return "Adresse e-mail invalide.";
  if (m.includes("email not confirmed")) return "Ce compte n'a pas encore confirmé son e-mail.";

  return messageBrut;
}
