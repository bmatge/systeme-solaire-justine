import type { ModeAffichage } from '../types';

/**
 * Compact mode: logarithmic scale so all planets are visible.
 * Maps AU distance to pixels from center.
 */
function compactScale(distanceAU: number): number {
  if (distanceAU === 0) return 0;
  return Math.sign(distanceAU) * Math.log10(Math.abs(distanceAU) * 100 + 1) * 100;
}

/**
 * Real proportions mode: linear scale.
 */
function realScale(distanceAU: number, pixelsPerAU: number): number {
  return distanceAU * pixelsPerAU;
}

/**
 * Convert AU coordinates to canvas pixel coordinates.
 */
export function auVersPixels(
  xAU: number,
  yAU: number,
  mode: ModeAffichage,
  zoom: number,
  centreVue: { x: number; y: number },
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number } {
  const centreX = canvasWidth / 2;
  const centreY = canvasHeight / 2;

  let px: number, py: number;

  if (mode === 'compact') {
    // Convert to polar, apply log scale to radius, convert back
    // This avoids the "square orbits" artifact from scaling x and y independently
    const r = Math.sqrt(xAU * xAU + yAU * yAU);
    if (r === 0) {
      px = 0;
      py = 0;
    } else {
      const scaledR = compactScale(r) * zoom;
      const angle = Math.atan2(yAU, xAU);
      px = scaledR * Math.cos(angle);
      py = scaledR * Math.sin(angle);
    }
  } else {
    const pixelsPerAU = 30 * zoom;
    px = realScale(xAU, pixelsPerAU);
    py = realScale(yAU, pixelsPerAU);
  }

  return {
    x: centreX + px + centreVue.x,
    y: centreY + py + centreVue.y,
  };
}

/**
 * Get body display radius based on mode and zoom.
 */
export function rayonAffichageCorps(
  rayonBase: number,
  mode: ModeAffichage,
  zoom: number,
  rayonReelKm?: number,
  isEtoile?: boolean
): number {
  if (mode === 'compact') {
    return Math.max(3, rayonBase * Math.min(zoom, 2));
  } else {
    if (!rayonReelKm) return Math.max(2, rayonBase * 0.5);
    // In real proportions, use a capped multiplier:
    // - Star (Sun): smaller multiplier so it doesn't swallow inner planets
    // - Planets: larger multiplier so they remain visible
    const rayonAU = rayonReelKm / 149_597_870.7;
    const pixels = rayonAU * 30 * zoom;
    if (isEtoile) {
      return Math.max(8, pixels * 30);
    }
    return Math.max(3, pixels * 600);
  }
}

/**
 * Get orbit trail radius for compact mode display.
 */
export function rayonOrbiteCompact(demiGrandAxeAU: number, zoom: number): number {
  return compactScale(demiGrandAxeAU) * zoom;
}

/**
 * Get orbit trail radius for real mode display.
 */
export function rayonOrbiteReel(demiGrandAxeAU: number, zoom: number): number {
  return demiGrandAxeAU * 30 * zoom;
}
