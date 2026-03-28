import { useState } from 'react';
import type { EtatQuiz, QuizAction, NiveauQuiz } from '../../types';

interface Props {
  state: EtatQuiz;
  dispatch: React.Dispatch<QuizAction>;
}

const niveaux: { id: NiveauQuiz; label: string }[] = [
  { id: 'primaire', label: 'Primaire' },
  { id: 'college', label: 'Collège' },
  { id: 'lycee', label: 'Lycée' },
  { id: 'expert', label: 'Expert' },
];

export const niveauLabel: Record<NiveauQuiz, string> = {
  primaire: 'Primaire',
  college: 'Collège',
  lycee: 'Lycée',
  expert: 'Expert',
};

export default function QuizSetup({ state, dispatch }: Props) {
  const [nom, setNom] = useState('');

  const ajouterJoueur = () => {
    const trimmed = nom.trim();
    if (!trimmed) return;
    dispatch({ type: 'AJOUTER_JOUEUR', nom: trimmed });
    setNom('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') ajouterJoueur();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz du Système Solaire</h2>
          <p className="text-white/50 text-sm">
            Choisis le niveau, ajoute les joueurs et lance le quiz !
          </p>
        </div>

        {/* Niveau global */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Niveau
          </h3>
          <div className="flex gap-2">
            {niveaux.map((n) => (
              <button
                key={n.id}
                onClick={() => dispatch({ type: 'SET_NIVEAU', niveau: n.id })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  state.niveau === n.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add player */}
        <div className="flex gap-2">
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nom du joueur..."
            maxLength={20}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
          />
          <button
            onClick={ajouterJoueur}
            disabled={!nom.trim() || state.joueurs.length >= 6}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-white/10 disabled:text-white/30 rounded-xl text-sm font-medium transition-colors"
          >
            Ajouter
          </button>
        </div>

        {/* Player list */}
        {state.joueurs.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Joueurs ({state.joueurs.length}/6)
            </h3>
            {state.joueurs.map((joueur, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: couleurJoueur(i) }}
                  >
                    {joueur.nom[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{joueur.nom}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={joueur.niveau}
                    onChange={(e) =>
                      dispatch({ type: 'SET_NIVEAU_JOUEUR', index: i, niveau: e.target.value as NiveauQuiz })
                    }
                    className="bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white/70 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
                  >
                    {niveaux.map((n) => (
                      <option key={n.id} value={n.id} className="bg-gray-800">
                        {n.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => dispatch({ type: 'RETIRER_JOUEUR', index: i })}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Start button */}
        <button
          onClick={() => dispatch({ type: 'COMMENCER' })}
          disabled={state.joueurs.length === 0}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-white/10 disabled:to-white/10 disabled:text-white/30 rounded-xl text-sm font-semibold transition-all shadow-lg disabled:shadow-none"
        >
          Commencer le quiz
        </button>
      </div>
    </div>
  );
}

function couleurJoueur(index: number): string {
  const couleurs = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444'];
  return couleurs[index % couleurs.length];
}

export { couleurJoueur };
