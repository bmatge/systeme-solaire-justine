import { useSimulation } from '../../context/SimulationContext';

export default function ViewModeToggle() {
  const { state, dispatch } = useSimulation();

  return (
    <div className="absolute top-16 right-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-1 flex shadow-xl border border-white/10">
      <button
        onClick={() => dispatch({ type: 'SET_MODE_AFFICHAGE', mode: 'compact' })}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          state.modeAffichage === 'compact'
            ? 'bg-blue-500 text-white'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        Compact
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_MODE_AFFICHAGE', mode: 'proportions-reelles' })}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          state.modeAffichage === 'proportions-reelles'
            ? 'bg-blue-500 text-white'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        Proportions réelles
      </button>
    </div>
  );
}
