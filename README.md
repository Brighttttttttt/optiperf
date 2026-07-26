# Optiperf — Phase 1

Plateforme de coaching running. Version de démarrage : interface complète avec données de démonstration (pas encore de base de données).

## Lancer le projet sur ton PC

1. Installer Node.js LTS : https://nodejs.org (bouton vert, version LTS)
2. Ouvrir un terminal (touche Windows → taper "cmd" → Entrée)
3. Taper :

```
cd "C:\Users\hucel\Documents\Perso\Running_coaching\optiperf"
npm install
npm run dev
```

4. Ouvrir http://localhost:3000 dans le navigateur

## Ce qui est inclus (Phase 1)

- Page de connexion (choix coach / athlète — auth réelle à venir)
- Coach : tableau de bord + écurie, planning 4 semaines, analyse de séance (RPE + zones FC séance et moyenne 10 dernières), fiche athlète avec zones FC auto (5 zones, FC max), messagerie
- Athlète : ma semaine, dépôt de séance (.FIT + RPE + commentaire), messagerie

## Prochaines étapes

- Phase 1b : Supabase (comptes réels, base de données) — nécessite de créer un compte gratuit sur https://supabase.com
- Phase 2 : création/édition de séances, drag & drop du planning
- Phase 3 : parsing réel des fichiers .FIT, courbes, zones FC calculées
- Phase 4 : messagerie temps réel, déploiement sur Vercel
