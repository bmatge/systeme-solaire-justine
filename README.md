# 💫 JujuDesPlanetes

> Petit site pour **explorer le système solaire** et **tester ses connaissances par quiz** — vibe-codé par ma fille Justine.

Projet perso / familial. Application **React + TypeScript (Vite)**, installable en **PWA** (manifest + service worker), avec une simulation orbitale simple et un mini-quiz.

> ⚠️ Projet **archivé** — conservé tel quel pour mémoire.

## Contenu

- **Exploration** : fiches des corps célestes (`src/data/celestialBodies.ts`), simulation et mécanique orbitale (`src/utils/orbitalMechanics.ts`, `src/context/SimulationContext.tsx`).
- **Quiz** : questions (`src/data/quizQuestions.ts`) + logique de jeu (`src/hooks/useQuizGame.ts`).
- **PWA** : `public/manifest.json` + `src/hooks/useServiceWorker.ts`.

## Développement

```bash
npm install
npm run dev       # serveur de dev Vite
npm run build     # build de production
```
