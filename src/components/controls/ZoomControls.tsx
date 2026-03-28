import { useSimulation } from '../../context/SimulationContext';

export default function ZoomControls() {
  const { state, dispatch } = useSimulation();

  const zoomIn = () => dispatch({ type: 'SET_ZOOM', zoom: state.zoom * 1.3 });
  const zoomOut = () => dispatch({ type: 'SET_ZOOM', zoom: state.zoom / 1.3 });
  const recenter = () => dispatch({ type: 'SET_CENTRE_VUE', centre: { x: 0, y: 0 } });

  return (
    <div className="absolute bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-4 flex flex-col gap-2">
      <button
        onClick={zoomIn}
        className="w-10 h-10 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gray-800/90 transition-colors shadow-xl text-lg font-light"
        title="Zoom +"
      >
        +
      </button>
      <button
        onClick={zoomOut}
        className="w-10 h-10 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gray-800/90 transition-colors shadow-xl text-lg font-light"
        title="Zoom -"
      >
        -
      </button>
      <button
        onClick={recenter}
        className="w-10 h-10 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gray-800/90 transition-colors shadow-xl"
        title="Recentrer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8m-8-8h.01M4 4h.01M20 4h.01M20 20h.01M4 20h.01" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
  );
}
