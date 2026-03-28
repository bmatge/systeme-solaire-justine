import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { SimulationState, SimulationAction } from '../types';

const etatInitial: SimulationState = {
  tempsSimulation: 0,
  vitesse: 1,
  enPause: false,
  modeAffichage: 'compact',
  corpsSelectionne: null,
  zoom: 1,
  centreVue: { x: 0, y: 0 },
};

function reducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case 'SET_VITESSE':
      return { ...state, vitesse: action.vitesse };
    case 'TOGGLE_PAUSE':
      return { ...state, enPause: !state.enPause };
    case 'SET_PAUSE':
      return { ...state, enPause: action.enPause };
    case 'SET_MODE_AFFICHAGE':
      return {
        ...state,
        modeAffichage: action.mode,
        zoom: action.mode === 'compact' ? 1 : 0.3,
        centreVue: { x: 0, y: 0 },
      };
    case 'SELECTIONNER_CORPS':
      return { ...state, corpsSelectionne: action.id };
    case 'SET_ZOOM':
      return { ...state, zoom: Math.max(0.05, Math.min(50, action.zoom)) };
    case 'SET_CENTRE_VUE':
      return { ...state, centreVue: action.centre };
    case 'TICK':
      if (state.enPause) return state;
      return {
        ...state,
        tempsSimulation: state.tempsSimulation + action.deltaTime * state.vitesse,
      };
    default:
      return state;
  }
}

const SimulationContext = createContext<{
  state: SimulationState;
  dispatch: React.Dispatch<SimulationAction>;
} | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, etatInitial);
  return (
    <SimulationContext.Provider value={{ state, dispatch }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider');
  return ctx;
}
