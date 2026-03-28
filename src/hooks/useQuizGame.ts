import { useReducer } from 'react';
import type { EtatQuiz, QuizAction } from '../types';
import { melangerQuestionsParJoueur } from '../data/quizQuestions';

const etatInitial: EtatQuiz = {
  joueurs: [],
  joueurActuel: 0,
  questionActuelle: 0,
  questions: [],
  phase: 'configuration',
  reponseChoisie: null,
  montrerReponse: false,
  questionsParJoueur: 5,
  questionsRepondues: 0,
  classe: 'cm2',
};

function reducer(state: EtatQuiz, action: QuizAction): EtatQuiz {
  switch (action.type) {
    case 'AJOUTER_JOUEUR':
      if (state.joueurs.length >= 6) return state;
      return {
        ...state,
        joueurs: [...state.joueurs, { nom: action.nom, score: 0, classe: state.classe }],
      };

    case 'RETIRER_JOUEUR':
      return {
        ...state,
        joueurs: state.joueurs.filter((_, i) => i !== action.index),
      };

    case 'SET_CLASSE':
      return { ...state, classe: action.classe };

    case 'SET_CLASSE_JOUEUR': {
      const joueursMaj = [...state.joueurs];
      joueursMaj[action.index] = { ...joueursMaj[action.index], classe: action.classe };
      return { ...state, joueurs: joueursMaj };
    }

    case 'COMMENCER':
      if (state.joueurs.length === 0) return state;
      return {
        ...state,
        phase: 'en-cours',
        questions: melangerQuestionsParJoueur(state.joueurs, state.questionsParJoueur),
        questionActuelle: 0,
        joueurActuel: 0,
        reponseChoisie: null,
        montrerReponse: false,
        questionsRepondues: 0,
        joueurs: state.joueurs.map((j) => ({ ...j, score: 0 })),
      };

    case 'REPONDRE': {
      if (state.montrerReponse) return state;
      const question = state.questions[state.questionActuelle];
      const correct = action.index === question.bonneReponse;
      const joueurs = [...state.joueurs];
      if (correct) {
        joueurs[state.joueurActuel] = {
          ...joueurs[state.joueurActuel],
          score: joueurs[state.joueurActuel].score + 1,
        };
      }
      return {
        ...state,
        reponseChoisie: action.index,
        montrerReponse: true,
        joueurs,
      };
    }

    case 'QUESTION_SUIVANTE': {
      const nextQuestionsRepondues = state.questionsRepondues + 1;
      const totalQuestions = state.questionsParJoueur * state.joueurs.length;

      if (
        nextQuestionsRepondues >= totalQuestions ||
        state.questionActuelle + 1 >= state.questions.length
      ) {
        return { ...state, phase: 'resultats' };
      }

      const nextJoueur = (state.joueurActuel + 1) % state.joueurs.length;
      return {
        ...state,
        questionActuelle: state.questionActuelle + 1,
        joueurActuel: nextJoueur,
        reponseChoisie: null,
        montrerReponse: false,
        questionsRepondues: nextQuestionsRepondues,
      };
    }

    case 'REINITIALISER':
      return { ...etatInitial };

    default:
      return state;
  }
}

export function useQuizGame() {
  return useReducer(reducer, etatInitial);
}
