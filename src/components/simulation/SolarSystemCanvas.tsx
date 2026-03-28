import { useRef, useEffect, useCallback } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { corpsCelestes } from '../../data/celestialBodies';
import { calculerPositionAbsolue } from '../../utils/orbitalMechanics';
import { auVersPixels, rayonAffichageCorps } from '../../utils/scaleUtils';
import type { CorpsCeleste, SimulationState } from '../../types';

interface CorpsRendu {
  corps: CorpsCeleste;
  screenX: number;
  screenY: number;
  rayon: number;
}

export default function SolarSystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, dispatch } = useSimulation();
  const stateRef = useRef(state);
  stateRef.current = state;

  const corpsRendusRef = useRef<CorpsRendu[]>([]);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const pinchDistRef = useRef<number | null>(null);

  // Resize canvas to fill container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Draw function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const s = stateRef.current;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const displayW = w / dpr;
    const displayH = h / dpr;

    // Clear
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, displayW, displayH);

    // Draw stars background
    drawStars(ctx, displayW, displayH);

    const corpsRendus: CorpsRendu[] = [];

    // Draw asteroid belt
    drawAsteroidBelt(ctx, s, displayW, displayH);

    // Draw orbits by sampling points along the true elliptical path
    for (const corps of corpsCelestes) {
      if (!corps.orbite) continue;
      if (corps.type === 'satellite') continue;

      const parentPos = corps.parent
        ? calculerPositionAbsolue(
            corpsCelestes.find((c) => c.id === corps.parent)!,
            s.tempsSimulation,
            corpsCelestes
          )
        : { x: 0, y: 0 };

      const { demiGrandAxe, excentricite } = corps.orbite;
      const steps = 120;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const r = demiGrandAxe * (1 - excentricite * excentricite) / (1 + excentricite * Math.cos(theta));
        const xAU = parentPos.x + r * Math.cos(theta);
        const yAU = parentPos.y + r * Math.sin(theta);
        const pt = auVersPixels(xAU, yAU, s.modeAffichage, s.zoom, s.centreVue, displayW, displayH);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw bodies
    for (const corps of corpsCelestes) {
      // In compact mode, skip the moon unless zoomed in
      if (corps.type === 'satellite' && s.modeAffichage === 'compact' && s.zoom < 3) continue;

      const pos = calculerPositionAbsolue(corps, s.tempsSimulation, corpsCelestes);
      const screen = auVersPixels(
        pos.x,
        pos.y,
        s.modeAffichage,
        s.zoom,
        s.centreVue,
        displayW,
        displayH
      );

      const rayon = rayonAffichageCorps(
        corps.rayonAffichage,
        s.modeAffichage,
        s.zoom,
        corps.physique.rayon,
        corps.type === 'etoile'
      );

      corpsRendus.push({ corps, screenX: screen.x, screenY: screen.y, rayon });

      // Draw glow for the sun
      if (corps.id === 'soleil') {
        const gradient = ctx.createRadialGradient(
          screen.x,
          screen.y,
          rayon * 0.5,
          screen.x,
          screen.y,
          rayon * 3
        );
        gradient.addColorStop(0, 'rgba(253, 184, 19, 0.4)');
        gradient.addColorStop(1, 'rgba(253, 184, 19, 0)');
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, rayon * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw rings for Saturn/Uranus
      if (corps.anneaux) {
        ctx.beginPath();
        ctx.ellipse(screen.x, screen.y, rayon * 2.2, rayon * 0.6, -0.3, 0, Math.PI * 2);
        ctx.strokeStyle = corps.id === 'saturne'
          ? 'rgba(244, 208, 63, 0.5)'
          : 'rgba(114, 181, 196, 0.3)';
        ctx.lineWidth = rayon * 0.3;
        ctx.stroke();
      }

      // Draw body
      const bodyGrad = ctx.createRadialGradient(
        screen.x - rayon * 0.3,
        screen.y - rayon * 0.3,
        rayon * 0.1,
        screen.x,
        screen.y,
        rayon
      );
      bodyGrad.addColorStop(0, corps.couleurSecondaire || lightenColor(corps.couleur, 40));
      bodyGrad.addColorStop(1, corps.couleur);

      ctx.beginPath();
      ctx.arc(screen.x, screen.y, rayon, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Selection highlight
      if (s.corpsSelectionne === corps.id) {
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, rayon + 4, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Label
      const fontSize = Math.max(10, Math.min(13, rayon * 0.8));
      ctx.font = `${fontSize}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText(corps.nom, screen.x, screen.y + rayon + fontSize + 4);
    }

    corpsRendusRef.current = corpsRendus;

    // Scale indicator in real proportions mode
    if (s.modeAffichage === 'proportions-reelles') {
      drawScale(ctx, displayW, displayH, s.zoom);
    }
  }, []);

  // Animation loop
  useAnimationLoop((dt) => {
    dispatch({ type: 'TICK', deltaTime: dt });
    draw();
  });

  // Click/tap handler
  const handleClick = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Find closest body
      let closest: CorpsRendu | null = null;
      let minDist = Infinity;

      for (const cr of corpsRendusRef.current) {
        const dist = Math.hypot(x - cr.screenX, y - cr.screenY);
        const hitRadius = Math.max(cr.rayon + 10, 20);
        if (dist < hitRadius && dist < minDist) {
          minDist = dist;
          closest = cr;
        }
      }

      dispatch({ type: 'SELECTIONNER_CORPS', id: closest?.corps.id ?? null });
    },
    [dispatch]
  );

  // Mouse/touch events
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!lastPointerRef.current) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        isDraggingRef.current = true;
      }

      if (isDraggingRef.current) {
        const s = stateRef.current;
        dispatch({
          type: 'SET_CENTRE_VUE',
          centre: { x: s.centreVue.x + dx, y: s.centreVue.y + dy },
        });
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
      }
    },
    [dispatch]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) {
        handleClick(e.clientX, e.clientY);
      }
      lastPointerRef.current = null;
      isDraggingRef.current = false;
    },
    [handleClick]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      dispatch({ type: 'SET_ZOOM', zoom: s.zoom * factor });
    },
    [dispatch]
  );

  // Touch pinch zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchDistRef.current = Math.hypot(dx, dy);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && pinchDistRef.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const scale = dist / pinchDistRef.current;
        const s = stateRef.current;
        dispatch({ type: 'SET_ZOOM', zoom: s.zoom * scale });
        pinchDistRef.current = dist;
      }
    },
    [dispatch]
  );

  const handleTouchEnd = useCallback(() => {
    pinchDistRef.current = null;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
}

// Simple star field (cached positions via seed)
let starsCache: { x: number; y: number; r: number; b: number }[] | null = null;

function drawStars(ctx: CanvasRenderingContext2D, w: number, h: number) {
  if (!starsCache) {
    starsCache = [];
    const rng = mulberry32(42);
    for (let i = 0; i < 200; i++) {
      starsCache.push({
        x: rng() * 2000,
        y: rng() * 2000,
        r: rng() * 1.5 + 0.5,
        b: rng() * 0.5 + 0.3,
      });
    }
  }
  for (const star of starsCache) {
    const sx = star.x % w;
    const sy = star.y % h;
    ctx.beginPath();
    ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.b})`;
    ctx.fill();
  }
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

// Asteroid belt: pre-generated rocks between 2.1 and 3.3 AU
interface Asteroide {
  distance: number;  // AU from Sun
  angle0: number;    // initial angle
  periode: number;   // orbital period in days (varies with distance)
  taille: number;    // display size 0-1
  luminosite: number;
}

let asteroidesCache: Asteroide[] | null = null;

function genererAsteroides(): Asteroide[] {
  const rng = mulberry32(1337);
  const count = 300;
  const result: Asteroide[] = [];
  for (let i = 0; i < count; i++) {
    const distance = 2.1 + rng() * 1.2; // 2.1 to 3.3 AU
    // Kepler's 3rd law: T² ∝ a³ → T = 365.25 * a^1.5
    const periode = 365.25 * Math.pow(distance, 1.5);
    result.push({
      distance,
      angle0: rng() * Math.PI * 2,
      periode,
      taille: rng() * 0.8 + 0.2,
      luminosite: rng() * 0.3 + 0.08,
    });
  }
  return result;
}

function drawAsteroidBelt(
  ctx: CanvasRenderingContext2D,
  s: SimulationState,
  displayW: number,
  displayH: number
) {
  if (!asteroidesCache) {
    asteroidesCache = genererAsteroides();
  }

  for (const a of asteroidesCache) {
    const angle = a.angle0 + (2 * Math.PI * s.tempsSimulation) / a.periode;
    const xAU = a.distance * Math.cos(angle);
    const yAU = a.distance * Math.sin(angle);
    const pt = auVersPixels(xAU, yAU, s.modeAffichage, s.zoom, s.centreVue, displayW, displayH);

    // Skip if off-screen
    if (pt.x < -10 || pt.x > displayW + 10 || pt.y < -10 || pt.y > displayH + 10) continue;

    const r = Math.max(0.5, a.taille * 1.5 * Math.min(s.zoom, 2));
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 160, 130, ${a.luminosite})`;
    ctx.fill();
  }
}

function drawScale(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  zoom: number
) {
  const pixelsPerAU = 30 * zoom;
  // Find a nice scale bar length
  const targetPx = 150;
  const auLength = targetPx / pixelsPerAU;

  let label: string;
  let barAU: number;

  if (auLength >= 10) {
    barAU = Math.round(auLength / 10) * 10;
    label = `${barAU} UA`;
  } else if (auLength >= 1) {
    barAU = Math.round(auLength);
    label = `${barAU} UA`;
  } else {
    const millions = auLength * 149.6;
    barAU = Math.round(millions) / 149.6;
    label = `${Math.round(millions)} M km`;
  }

  const barPx = barAU * pixelsPerAU;
  const x = w - barPx - 20;
  const y = h - 30;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + barPx, y);
  ctx.moveTo(x, y - 5);
  ctx.lineTo(x, y + 5);
  ctx.moveTo(x + barPx, y - 5);
  ctx.lineTo(x + barPx, y + 5);
  ctx.stroke();

  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + barPx / 2, y - 10);
}
