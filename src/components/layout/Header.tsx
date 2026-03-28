import type { ModeApp } from '../../types';

interface HeaderProps {
  mode: ModeApp;
  onChangeMode: (mode: ModeApp) => void;
}

export default function Header({ mode, onChangeMode }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-12 bg-gray-950/80 backdrop-blur-sm border-b border-white/5">
      <h1 className="text-sm font-semibold tracking-wide">
        <span>💫</span>{' '}
        <span className="text-white/90">JujuDes</span>
        <span className="text-blue-400">Planetes</span>
      </h1>

      <div className="flex bg-white/5 rounded-lg p-0.5">
        <button
          onClick={() => onChangeMode('exploration')}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            mode === 'exploration'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-white/50 hover:text-white/70'
          }`}
        >
          Explorer
        </button>
        <button
          onClick={() => onChangeMode('quiz')}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            mode === 'quiz'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-white/50 hover:text-white/70'
          }`}
        >
          Quiz
        </button>
      </div>
    </header>
  );
}
