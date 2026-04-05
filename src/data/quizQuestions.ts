import type { QuestionQuiz, NiveauQuiz } from '../types';
import { questionsPrimaire } from './quiz/primaire';
import { questionsCollege } from './quiz/college';
import { questionsLycee } from './quiz/lycee';
import { questionsExpert } from './quiz/expert';

export const questionsQuiz: QuestionQuiz[] = [
  ...questionsPrimaire,
  ...questionsCollege,
  ...questionsLycee,
  ...questionsExpert,
];

function shuffle(arr: QuestionQuiz[]): QuestionQuiz[] {
  const copie = [...arr];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

function questionsParNiveau(niveau: NiveauQuiz): QuestionQuiz[] {
  const filtrees = questionsQuiz.filter((q) => q.niveau === niveau);
  return shuffle(filtrees);
}

/**
 * Génère une liste de questions entrelacées selon le niveau de chaque joueur.
 * question[0] → joueur 0, question[1] → joueur 1, etc.
 */
export function melangerQuestionsParJoueur(
  joueurs: { niveau: NiveauQuiz }[],
  questionsParJoueur: number,
): QuestionQuiz[] {
  const poolParNiveau = new Map<NiveauQuiz, QuestionQuiz[]>();
  for (const joueur of joueurs) {
    if (!poolParNiveau.has(joueur.niveau)) {
      poolParNiveau.set(joueur.niveau, questionsParNiveau(joueur.niveau));
    }
  }

  const indexParNiveau = new Map<NiveauQuiz, number>();
  for (const niveau of poolParNiveau.keys()) {
    indexParNiveau.set(niveau, 0);
  }

  const result: QuestionQuiz[] = [];
  for (let tour = 0; tour < questionsParJoueur; tour++) {
    for (const joueur of joueurs) {
      const pool = poolParNiveau.get(joueur.niveau)!;
      const idx = indexParNiveau.get(joueur.niveau)!;
      if (idx < pool.length) {
        result.push(pool[idx]);
        indexParNiveau.set(joueur.niveau, idx + 1);
      }
    }
  }

  return result;
}
