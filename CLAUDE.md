# Optiperf

Plateforme de coaching running (coach ↔ athlète). Actuellement en **Phase 1** : interface complète avec données de démonstration, pas encore de backend réel.

## Stack

- Next.js 14 (App Router — pas de `src/pages`)
- React 18, TypeScript strict
- Tailwind CSS
- Pas encore de base de données : données mock dans `src/lib/mock.ts`
- Pas encore d'auth réelle : `src/app/login` ne fait que choisir un rôle (coach/athlète)

## Structure

- `src/app/coach/` — dashboard, écurie, planning 4 semaines, analyse de séance (RPE + zones FC), fiche athlète, messagerie
- `src/app/athlete/` — ma semaine, dépôt de séance (.FIT + RPE + commentaire), messagerie
- `src/app/login/` — sélection coach/athlète
- `src/components/` — composants partagés (ex. `SidebarCoach`)
- `src/lib/mock.ts` — données de démo, à remplacer par Supabase en Phase 1b

## Roadmap (voir aussi README.md)

1. **Phase 1** (actuelle) — interface complète, données mock
2. **Phase 1b** — Supabase (comptes réels, base de données)
3. **Phase 2** — création/édition de séances, drag & drop du planning
4. **Phase 3** — parsing réel des fichiers .FIT, courbes, zones FC calculées
5. **Phase 4** — messagerie temps réel, déploiement Vercel

## Commandes

```
npm run dev      # serveur de dev (localhost:3000)
npm run build    # build de prod
npm run lint     # lint Next.js
```

## Conventions

- Textes d'UI en français
- Imports via l'alias `@/*` (pointe vers `src/*`)
- Pas d'abstraction ni de code prématuré pour des besoins des phases futures : on code la phase en cours, pas les suivantes
- `.env*.local` ne doit jamais être commité (déjà exclu par `.gitignore`)

## Notes pour Claude

- Le propriétaire du projet code avec l'aide de Claude Code mais n'est pas développeur professionnel : donner des explications claires, éviter le jargon non expliqué, en particulier pour tout ce qui touche au terminal, à git/GitHub, ou au déploiement.
- Ne pas ajouter d'auth, de DB ou d'infra avant que la phase correspondante ne soit lancée (voir Roadmap ci-dessus).
