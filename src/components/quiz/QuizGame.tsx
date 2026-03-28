import type { EtatQuiz, QuizAction } from '../../types';
import { couleurJoueur } from './QuizSetup';

interface Props {
  state: EtatQuiz;
  dispatch: React.Dispatch<QuizAction>;
}

export default function QuizGame({ state, dispatch }: Props) {
  const question = state.questions[state.questionActuelle];
  const joueur = state.joueurs[state.joueurActuel];
  const totalQuestions = state.questionsParJoueur * state.joueurs.length;
  const progression = ((state.questionsRepondues) / totalQuestions) * 100;

  return (
    <div className="flex flex-col min-h-full px-4 py-6">
      {/* Progress bar */}
      <div className="w-full max-w-lg mx-auto mb-6">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progression}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-white/40">
          <span>Question {state.questionsRepondues + 1}/{totalQuestions}</span>
          <span>Tour de {joueur.nom}</span>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="w-full max-w-lg mx-auto flex gap-2 mb-6 overflow-x-auto">
        {state.joueurs.map((j, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs shrink-0 ${
              i === state.joueurActuel
                ? 'bg-white/10 ring-2 ring-blue-500/50'
                : 'bg-white/5'
            }`}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: couleurJoueur(i) }}
            >
              {j.nom[0].toUpperCase()}
            </div>
            <span className="font-medium">{j.nom}</span>
            <span className="text-white/40 ml-1">{j.score}</span>
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-center">
        <div className="bg-white/5 rounded-2xl p-6 mb-4">
          <p className="text-lg font-medium leading-relaxed text-center">
            {question.question}
          </p>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {question.reponses.map((reponse, i) => {
            let classes = 'bg-white/5 hover:bg-white/10 border-white/10';

            if (state.montrerReponse) {
              if (i === question.bonneReponse) {
                classes = 'bg-green-500/20 border-green-500/50 text-green-300';
              } else if (i === state.reponseChoisie && i !== question.bonneReponse) {
                classes = 'bg-red-500/20 border-red-500/50 text-red-300';
              } else {
                classes = 'bg-white/5 border-white/5 text-white/30';
              }
            }

            return (
              <button
                key={i}
                onClick={() => dispatch({ type: 'REPONDRE', index: i })}
                disabled={state.montrerReponse}
                className={`p-4 rounded-xl border text-sm font-medium text-left transition-all ${classes}`}
              >
                <span className="text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                {reponse}
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {state.montrerReponse && (
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-sm text-blue-200/80">{question.explication}</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'QUESTION_SUIVANTE' })}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition-colors"
            >
              Question suivante
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
