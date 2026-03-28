import type { CorpsCeleste } from '../types';

export interface Position {
  x: number; // in AU
  y: number; // in AU
}

/**
 * Calculate the position of a celestial body at a given time using simplified Kepler equations.
 * Returns position in AU relative to its parent body.
 */
export function calculerPosition(corps: CorpsCeleste, tempsJours: number): Position {
  if (!corps.orbite) return { x: 0, y: 0 };

  const { demiGrandAxe, excentricite, periodeOrbitale, phaseInitiale } = corps.orbite;

  // Mean anomaly
  const M = phaseInitiale + (2 * Math.PI * tempsJours) / periodeOrbitale;

  // Solve Kepler's equation iteratively: E - e*sin(E) = M
  let E = M;
  for (let i = 0; i < 5; i++) {
    E = M + excentricite * Math.sin(E);
  }

  // True anomaly from eccentric anomaly
  const theta =
    2 *
    Math.atan2(
      Math.sqrt(1 + excentricite) * Math.sin(E / 2),
      Math.sqrt(1 - excentricite) * Math.cos(E / 2)
    );

  // Distance from focus (parent body)
  const r =
    demiGrandAxe * (1 - excentricite * excentricite) / (1 + excentricite * Math.cos(theta));

  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
}

/**
 * Get absolute position of a body (resolving parent chain).
 */
export function calculerPositionAbsolue(
  corps: CorpsCeleste,
  tempsJours: number,
  tousLesCorps: CorpsCeleste[]
): Position {
  const posRelative = calculerPosition(corps, tempsJours);

  if (corps.parent) {
    const parent = tousLesCorps.find((c) => c.id === corps.parent);
    if (parent) {
      const posParent = calculerPositionAbsolue(parent, tempsJours, tousLesCorps);
      return {
        x: posParent.x + posRelative.x,
        y: posParent.y + posRelative.y,
      };
    }
  }

  return posRelative;
}
