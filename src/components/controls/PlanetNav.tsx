import { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { corpsCelestes } from '../../data/celestialBodies';
import { calculerPositionAbsolue } from '../../utils/orbitalMechanics';
import { auVersPixels } from '../../utils/scaleUtils';

export default function PlanetNav() {
  const { state, dispatch } = useSimulation();
  const [ouvert, setOuvert] = useState(false);

  const naviguer = (id: string) => {
    const corps = corpsCelestes.find((c) => c.id === id);
    if (!corps) return;

    dispatch({ type: 'SELECTIONNER_CORPS', id });

    const pos = calculerPositionAbsolue(corps, state.tempsSimulation, corpsCelestes);
    const screen = auVersPixels(
      pos.x,
      pos.y,
      state.modeAffichage,
      state.zoom,
      { x: 0, y: 0 },
      window.innerWidth,
      window.innerHeight
    );
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    dispatch({
      type: 'SET_CENTRE_VUE',
      centre: { x: cx - screen.x, y: cy - screen.y },
    });

    // Auto-close on mobile after selection
    if (window.innerWidth < 768) setOuvert(false);
  };

  const planetes = corpsCelestes.filter(
    (c) => c.type !== 'satellite'
  );

  return (
    <div className="absolute top-[calc(4rem+env(safe-area-inset-top,0px))] left-4 z-10">
      {/* Toggle button */}
      <button
        onClick={() => setOuvert(!ouvert)}
        className="bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-white/10 flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white transition-colors"
      >
        <svg
          className={`w-4 h-4 transition-transform ${ouvert ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Navigation
      </button>

      {/* Collapsible list */}
      {ouvert && (
        <div className="mt-1 bg-gray-900/90 backdrop-blur-sm rounded-xl p-2 shadow-xl border border-white/10 max-h-[50vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-1">
            {planetes.map((corps) => (
              <button
                key={corps.id}
                onClick={() => naviguer(corps.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  state.corpsSelectionne === corps.id
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`w-3 h-3 shrink-0 ${corps.type === 'ceinture' ? 'rounded-sm border border-white/20' : 'rounded-full'}`}
                  style={{ backgroundColor: corps.couleur }}
                />
                <span>{corps.nom}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
