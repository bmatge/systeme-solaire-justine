import { useState } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Header from './components/layout/Header';
import SolarSystemCanvas from './components/simulation/SolarSystemCanvas';
import TimeControls from './components/controls/TimeControls';
import ViewModeToggle from './components/controls/ViewModeToggle';
import ZoomControls from './components/controls/ZoomControls';
import PlanetNav from './components/controls/PlanetNav';
import BodyDetailPanel from './components/details/BodyDetailPanel';
import QuizSetup from './components/quiz/QuizSetup';
import QuizGame from './components/quiz/QuizGame';
import QuizResults from './components/quiz/QuizResults';
import { useQuizGame } from './hooks/useQuizGame';
import type { ModeApp } from './types';

function App() {
  const [mode, setMode] = useState<ModeApp>('exploration');
  const [quizState, quizDispatch] = useQuizGame();

  return (
    <div className="w-full h-screen bg-gray-950 text-white overflow-hidden relative">
      <Header mode={mode} onChangeMode={setMode} />

      {mode === 'exploration' ? (
        <SimulationProvider>
          <div className="w-full h-full pt-12">
            <SolarSystemCanvas />
            <PlanetNav />
            <ViewModeToggle />
            <ZoomControls />
            <TimeControls />
            <BodyDetailPanel />
          </div>
        </SimulationProvider>
      ) : (
        <div className="w-full h-full pt-12 overflow-y-auto">
          {quizState.phase === 'configuration' && (
            <QuizSetup state={quizState} dispatch={quizDispatch} />
          )}
          {quizState.phase === 'en-cours' && (
            <QuizGame state={quizState} dispatch={quizDispatch} />
          )}
          {quizState.phase === 'resultats' && (
            <QuizResults state={quizState} dispatch={quizDispatch} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
