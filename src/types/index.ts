export interface OrbiteParams {
  demiGrandAxe: number;       // Semi-major axis in AU
  excentricite: number;       // Eccentricity
  periodeOrbitale: number;    // Orbital period in Earth days
  phaseInitiale: number;      // Starting angle in radians
}

export interface PhysiqueParams {
  rayon: number;              // Equatorial radius in km
  masse: string;              // Mass as readable string (e.g. "5.97 × 10²⁴ kg")
  densite: number;            // Mean density in g/cm³
  gravite: number;            // Surface gravity in m/s²
  temperature: number;        // Mean surface temp in °C
}

export interface CorpsCeleste {
  id: string;
  nom: string;
  type: 'etoile' | 'planete' | 'planete-naine' | 'satellite' | 'ceinture';
  parent?: string;            // Parent body id
  orbite?: OrbiteParams;
  physique: PhysiqueParams;
  couleur: string;
  couleurSecondaire?: string;
  rayonAffichage: number;     // Display radius in compact mode (px)
  description: string;
  composition: string;
  curiosites: string[];
  anneaux?: boolean;
}

export type ModeAffichage = 'compact' | 'proportions-reelles';
export type ModeApp = 'exploration' | 'quiz';

export interface SimulationState {
  tempsSimulation: number;    // Days since epoch
  vitesse: number;            // Speed multiplier
  enPause: boolean;
  modeAffichage: ModeAffichage;
  corpsSelectionne: string | null;
  zoom: number;
  centreVue: { x: number; y: number };
}

export type SimulationAction =
  | { type: 'SET_VITESSE'; vitesse: number }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'SET_PAUSE'; enPause: boolean }
  | { type: 'SET_MODE_AFFICHAGE'; mode: ModeAffichage }
  | { type: 'SELECTIONNER_CORPS'; id: string | null }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'SET_CENTRE_VUE'; centre: { x: number; y: number } }
  | { type: 'TICK'; deltaTime: number };

export type NiveauQuiz = 'primaire' | 'college' | 'lycee' | 'expert';

export type ClasseQuiz =
  | 'cp' | 'ce1' | 'ce2' | 'cm1' | 'cm2'
  | '6eme' | '5eme' | '4eme' | '3eme'
  | '2nde' | '1ere' | 'terminale'
  | 'expert';

export interface QuestionQuiz {
  id: number;
  question: string;
  reponses: string[];
  bonneReponse: number;
  explication: string;
  categorie?: string;
  niveau: NiveauQuiz;
}

export interface Joueur {
  nom: string;
  score: number;
  classe: ClasseQuiz;
}

export type PhaseQuiz = 'configuration' | 'en-cours' | 'resultats';

export interface EtatQuiz {
  joueurs: Joueur[];
  joueurActuel: number;
  questionActuelle: number;
  questions: QuestionQuiz[];
  phase: PhaseQuiz;
  reponseChoisie: number | null;
  montrerReponse: boolean;
  questionsParJoueur: number;
  questionsRepondues: number;
  classe: ClasseQuiz;
}

export type QuizAction =
  | { type: 'AJOUTER_JOUEUR'; nom: string }
  | { type: 'RETIRER_JOUEUR'; index: number }
  | { type: 'SET_CLASSE'; classe: ClasseQuiz }
  | { type: 'SET_CLASSE_JOUEUR'; index: number; classe: ClasseQuiz }
  | { type: 'COMMENCER' }
  | { type: 'REPONDRE'; index: number }
  | { type: 'QUESTION_SUIVANTE' }
  | { type: 'REINITIALISER' };
