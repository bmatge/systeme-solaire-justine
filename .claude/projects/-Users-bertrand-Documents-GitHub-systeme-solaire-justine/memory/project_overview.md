---
name: project_overview
description: Solar system educational app - stack, architecture, and key design decisions
type: project
---

Application éducative de visualisation du système solaire, destinée à Justine.

**Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS 4 (no router, no state library)

**Architecture:**
- Canvas 2D (pas Three.js) pour le rendu orbital top-down — léger et suffisant
- React Context + useReducer pour l'état partagé (SimulationContext)
- Animation via requestAnimationFrame (hook useAnimationLoop), rendu impératif sur le canvas
- Deux modes d'affichage : "compact" (échelle logarithmique) et "proportions réelles" (linéaire + barre d'échelle)
- Quiz : state machine via useReducer (useQuizGame), multijoueur au tour par tour, 35 questions

**Why:** App éducative simple, pas besoin de backend ni de 3D. Mobile-first avec overlays sur le canvas.

**How to apply:** Garder la simplicité. Pas de routing, pas de state management externe. Tout en français.
