import { useSimulation } from '../../context/SimulationContext';

const vitesses = [
  { label: '0.1×', value: 0.1 },
  { label: '0.5×', value: 0.5 },
  { label: '1×', value: 1 },
  { label: '5×', value: 5 },
  { label: '10×', value: 10 },
  { label: '50×', value: 50 },
  { label: '100×', value: 100 },
];

export default function TimeControls() {
  const { state, dispatch } = useSimulation();

  const joursEcoules = Math.floor(state.tempsSimulation);
  const annees = Math.floor(joursEcoules / 365.25);
  const joursRestants = Math.floor(joursEcoules % 365.25);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/10 max-w-[95vw]">
      {/* Play/Pause */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
        title={state.enPause ? 'Lecture' : 'Pause'}
      >
        {state.enPause ? (
          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        )}
      </button>

      {/* Speed selector */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {vitesses.map((v) => (
          <button
            key={v.value}
            onClick={() => dispatch({ type: 'SET_VITESSE', vitesse: v.value })}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              state.vitesse === v.value
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-white/60'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Time display */}
      <div className="text-xs text-white/50 whitespace-nowrap hidden sm:block pl-2 border-l border-white/10">
        {annees > 0 && <span>{annees}a </span>}
        <span>{joursRestants}j</span>
      </div>
    </div>
  );
}
