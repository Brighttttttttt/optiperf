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

## Roadmap (voir aussi README.md et issues GitHub)

Plan détaillé (vision, modèle de données, écrans) : `../PLAN_MVP.md` (dans `Running_coaching/`, hors de ce repo, non versionné).

1. **Priorité actuelle** — [issue #5](https://github.com/Brighttttttttt/optiperf/issues/5) : finaliser les enchaînements entre les pages (navigation de bout en bout sur les données mock) **avant** de brancher Supabase
2. [Issue #1](https://github.com/Brighttttttttt/optiperf/issues/1) — Phase 1b : Supabase (comptes réels, base de données)
3. [Issue #2](https://github.com/Brighttttttttt/optiperf/issues/2) — Phase 2 : création/édition de séances, drag & drop du planning
4. [Issue #3](https://github.com/Brighttttttttt/optiperf/issues/3) — Phase 3 : parsing réel des fichiers .FIT, courbes, zones FC calculées
5. [Issue #4](https://github.com/Brighttttttttt/optiperf/issues/4) — Phase 4 : messagerie temps réel, déploiement Vercel
6. [Issue #6](https://github.com/Brighttttttttt/optiperf/issues/6) — backlog après le MVP

## Commandes

```
npm run dev       # serveur de dev (localhost:3000)
npm run build     # build de prod
npm run lint      # lint Next.js
npm run test      # tests unitaires (Vitest)
npm run test:e2e  # tests de bout en bout (Playwright, port 3100 dédié)
```

## Workflow GitHub — à respecter à chaque fois

1. **Une issue avant le code.** Toute nouvelle fonctionnalité ou correction part d'une issue GitHub (créer l'issue si elle n'existe pas encore). Pas de code écrit sans issue associée.
2. **Une branche par issue**, nommée `feat/<numéro>-<sujet>` ou `fix/<numéro>-<sujet>` (ex. `feat/8-tests-vitest-playwright`).
3. **Commits** au format [Conventional Commits](https://www.conventionalcommits.org/) : `feat:`, `fix:`, `chore:`, `docs:`.
4. **Tests à chaque PR** :
   - Logique pure (calculs, transformations de données, parsing) → un test **Vitest** dans `src/**/*.test.ts`
   - Changement d'enchaînement entre pages / parcours utilisateur → un test **Playwright** dans `tests/e2e/`, ou mise à jour d'un test existant
   - Pas de couverture à 100 % exigée, mais pas de PR qui touche de la logique ou de la navigation sans test correspondant
5. **Pull Request systématique** vers `main`, même seul — jamais de push direct (branche protégée).
6. **CI verte obligatoire** avant de merger : lint + tests unitaires + build (`lint-and-build`) et tests e2e (`e2e-tests`).
7. **Merger en squash**, supprimer la branche après merge.

## Conventions

- Textes d'UI en français
- Imports via l'alias `@/*` (pointe vers `src/*`)
- Pas d'abstraction ni de code prématuré pour des besoins des phases futures : on code la phase en cours, pas les suivantes
- `.env*.local` ne doit jamais être commité (déjà exclu par `.gitignore`)

## Notes pour Claude

- Le propriétaire du projet code avec l'aide de Claude Code mais n'est pas développeur professionnel : donner des explications claires, éviter le jargon non expliqué, en particulier pour tout ce qui touche au terminal, à git/GitHub, ou au déploiement.
- Ne pas ajouter d'auth, de DB ou d'infra avant que la phase correspondante ne soit lancée (voir Roadmap ci-dessus).
