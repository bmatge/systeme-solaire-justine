import type { EtatQuiz, QuizAction, ClasseQuiz } from '../../types';
import { couleurJoueur } from './QuizSetup';

const classesLabels: Record<ClasseQuiz, string> = {
  cp: 'CP', ce1: 'CE1', ce2: 'CE2', cm1: 'CM1', cm2: 'CM2',
  '6eme': '6ème', '5eme': '5ème', '4eme': '4ème', '3eme': '3ème',
  '2nde': '2nde', '1ere': '1ère', terminale: 'Terminale', expert: 'Expert',
};

interface Props {
  state: EtatQuiz;
  dispatch: React.Dispatch<QuizAction>;
}

export default function QuizResults({ state, dispatch }: Props) {
  const classement = [...state.joueurs]
    .map((j, i) => ({ ...j, index: i }))
    .sort((a, b) => b.score - a.score);

  const maxScore = state.questionsParJoueur;

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Résultats</h2>
          <p className="text-white/50 text-sm">
            {classement[0].score === classement[1]?.score
              ? 'Égalité !'
              : `${classement[0].nom} remporte la partie !`}
          </p>
        </div>

        {/* Rankings */}
        <div className="space-y-3">
          {classement.map((joueur, rang) => (
            <div
              key={joueur.index}
              className={`flex items-center gap-4 p-4 rounded-2xl ${
                rang === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-white/5'
              }`}
            >
              <div className="text-2xl font-bold text-white/30 w-8 text-center">
                {rang + 1}
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ backgroundColor: couleurJoueur(joueur.index) }}
              >
                {joueur.nom[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-medium">{joueur.nom}</div>
                <div className="text-xs text-white/40">
                  {joueur.score}/{maxScore} bonnes réponses · {classesLabels[joueur.classe]}
                </div>
              </div>
              {rang === 0 && (
                <span className="text-2xl">
                  {classement.length > 1 ? '🏆' : '⭐'}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: 'COMMENCER' })}
            className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition-colors"
          >
            Rejouer
          </button>
          <button
            onClick={() => dispatch({ type: 'REINITIALISER' })}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-colors"
          >
            Nouveaux joueurs
          </button>
        </div>
      </div>
    </div>
  );
}
