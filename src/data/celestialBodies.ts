import type { CorpsCeleste } from '../types';

export const corpsCelestes: CorpsCeleste[] = [
  {
    id: 'soleil',
    nom: 'Soleil',
    type: 'etoile',
    physique: {
      rayon: 696340,
      masse: '1,989 × 10³⁰ kg',
      densite: 1.41,
      gravite: 274,
      temperature: 5500,
    },
    couleur: '#FDB813',
    couleurSecondaire: '#FF8C00',
    rayonAffichage: 22,
    description:
      "Le Soleil est l'étoile au centre de notre système solaire. C'est une étoile naine jaune de type spectral G2V, âgée d'environ 4,6 milliards d'années.",
    composition:
      'Hydrogène (73%), hélium (25%), et traces d\'éléments plus lourds (oxygène, carbone, néon, fer).',
    curiosites: [
      'Le Soleil représente 99,86% de la masse totale du système solaire.',
      'La lumière du Soleil met environ 8 minutes et 20 secondes pour atteindre la Terre.',
      'La température au cœur du Soleil atteint 15 millions de degrés Celsius.',
      'Le Soleil pourrait contenir environ 1,3 million de Terres.',
    ],
  },
  {
    id: 'mercure',
    nom: 'Mercure',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 0.387,
      excentricite: 0.206,
      periodeOrbitale: 87.97,
      phaseInitiale: 0,
    },
    physique: {
      rayon: 2439.7,
      masse: '3,301 × 10²³ kg',
      densite: 5.43,
      gravite: 3.7,
      temperature: 167,
    },
    couleur: '#A0522D',
    rayonAffichage: 5,
    description:
      "Mercure est la planète la plus proche du Soleil et la plus petite du système solaire. Elle n'a pratiquement pas d'atmosphère.",
    composition:
      'Noyau de fer très dense (environ 75% du rayon), manteau et croûte de silicates.',
    curiosites: [
      "Un jour sur Mercure (176 jours terrestres) est plus long que son année (88 jours).",
      "Mercure n'a pas de lune ni d'anneaux.",
      'Les températures varient de -180°C la nuit à 430°C le jour.',
      'Sa surface ressemble beaucoup à celle de notre Lune, couverte de cratères.',
    ],
  },
  {
    id: 'venus',
    nom: 'Vénus',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 0.723,
      excentricite: 0.007,
      periodeOrbitale: 224.7,
      phaseInitiale: 0.9,
    },
    physique: {
      rayon: 6051.8,
      masse: '4,867 × 10²⁴ kg',
      densite: 5.24,
      gravite: 8.87,
      temperature: 464,
    },
    couleur: '#DEB887',
    couleurSecondaire: '#F5DEB3',
    rayonAffichage: 8,
    description:
      "Vénus est la deuxième planète du système solaire. Souvent appelée « jumelle de la Terre » en raison de sa taille similaire, elle possède une atmosphère extrêmement dense et toxique.",
    composition:
      "Atmosphère de CO₂ (96,5%) avec des nuages d'acide sulfurique. Structure interne similaire à la Terre.",
    curiosites: [
      "Vénus tourne sur elle-même dans le sens inverse des autres planètes (rotation rétrograde).",
      "C'est la planète la plus chaude du système solaire, malgré sa distance au Soleil.",
      "Une journée sur Vénus est plus longue qu'une année vénusienne.",
      "Vénus est l'objet le plus brillant du ciel nocturne après la Lune.",
    ],
  },
  {
    id: 'terre',
    nom: 'Terre',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 1.0,
      excentricite: 0.017,
      periodeOrbitale: 365.25,
      phaseInitiale: 1.8,
    },
    physique: {
      rayon: 6371,
      masse: '5,972 × 10²⁴ kg',
      densite: 5.51,
      gravite: 9.81,
      temperature: 15,
    },
    couleur: '#4169E1',
    couleurSecondaire: '#228B22',
    rayonAffichage: 8,
    description:
      "La Terre est la troisième planète du système solaire et la seule connue pour abriter la vie. Elle possède une atmosphère riche en azote et oxygène, et de l'eau liquide en surface.",
    composition:
      "Noyau de fer et nickel, manteau de silicates, croûte rocheuse. 71% de la surface couverte d'eau.",
    curiosites: [
      "La Terre est la planète la plus dense du système solaire.",
      "Elle possède un champ magnétique puissant qui nous protège du vent solaire.",
      "L'atmosphère terrestre est composée de 78% d'azote et 21% d'oxygène.",
      "La Terre a environ 4,54 milliards d'années.",
    ],
  },
  {
    id: 'lune',
    nom: 'Lune',
    type: 'satellite',
    parent: 'terre',
    orbite: {
      demiGrandAxe: 0.00257,
      excentricite: 0.0549,
      periodeOrbitale: 27.32,
      phaseInitiale: 0.5,
    },
    physique: {
      rayon: 1737.4,
      masse: '7,342 × 10²² kg',
      densite: 3.34,
      gravite: 1.62,
      temperature: -20,
    },
    couleur: '#C0C0C0',
    rayonAffichage: 3,
    description:
      "La Lune est l'unique satellite naturel de la Terre. Elle influence les marées et stabilise l'axe de rotation terrestre.",
    composition:
      'Croûte de roches silicatées (anorthosite), manteau de silicates riches en fer et magnésium.',
    curiosites: [
      'La Lune montre toujours la même face à la Terre (rotation synchrone).',
      "12 astronautes ont marché sur la Lune entre 1969 et 1972.",
      "La Lune s'éloigne de la Terre d'environ 3,8 cm par an.",
      "La Lune n'a pas d'atmosphère, ce qui explique l'absence de son et de ciel bleu.",
    ],
  },
  {
    id: 'mars',
    nom: 'Mars',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 1.524,
      excentricite: 0.093,
      periodeOrbitale: 687.0,
      phaseInitiale: 3.2,
    },
    physique: {
      rayon: 3389.5,
      masse: '6,417 × 10²³ kg',
      densite: 3.93,
      gravite: 3.72,
      temperature: -65,
    },
    couleur: '#CD5C5C',
    couleurSecondaire: '#B22222',
    rayonAffichage: 7,
    description:
      "Mars est la quatrième planète du système solaire, surnommée la « planète rouge » en raison de l'oxyde de fer qui couvre sa surface.",
    composition:
      'Surface riche en oxyde de fer (rouille), noyau de fer et sulfure de fer, atmosphère ténue de CO₂.',
    curiosites: [
      "Olympus Mons sur Mars est le plus grand volcan du système solaire (21,9 km de haut).",
      "Mars possède deux petites lunes : Phobos et Deimos.",
      "Une journée martienne (sol) dure 24 heures et 37 minutes.",
      "Mars possède les plus grands canyons du système solaire (Valles Marineris, 4000 km de long).",
    ],
  },
  {
    id: 'jupiter',
    nom: 'Jupiter',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 5.203,
      excentricite: 0.048,
      periodeOrbitale: 4332.59,
      phaseInitiale: 4.5,
    },
    physique: {
      rayon: 69911,
      masse: '1,898 × 10²⁷ kg',
      densite: 1.33,
      gravite: 24.79,
      temperature: -110,
    },
    couleur: '#D2996C',
    couleurSecondaire: '#C4A882',
    rayonAffichage: 16,
    description:
      "Jupiter est la plus grande planète du système solaire. C'est une géante gazeuse composée principalement d'hydrogène et d'hélium.",
    composition:
      "Atmosphère d'hydrogène (90%) et d'hélium (10%). Possiblement un noyau rocheux au centre.",
    curiosites: [
      'La Grande Tache Rouge est une tempête qui dure depuis au moins 350 ans.',
      'Jupiter possède au moins 95 lunes connues.',
      'Jupiter est si massive que son barycentre avec le Soleil se situe en dehors du Soleil.',
      "Une journée sur Jupiter ne dure que 9 heures et 56 minutes, la plus courte du système solaire.",
    ],
  },
  {
    id: 'saturne',
    nom: 'Saturne',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 9.537,
      excentricite: 0.054,
      periodeOrbitale: 10759.22,
      phaseInitiale: 5.8,
    },
    physique: {
      rayon: 58232,
      masse: '5,683 × 10²⁶ kg',
      densite: 0.687,
      gravite: 10.44,
      temperature: -140,
    },
    couleur: '#F4D03F',
    couleurSecondaire: '#D4AC0D',
    rayonAffichage: 14,
    anneaux: true,
    description:
      "Saturne est la sixième planète du système solaire, célèbre pour ses magnifiques anneaux composés de glace et de roche.",
    composition:
      "Géante gazeuse composée principalement d'hydrogène et d'hélium. Les anneaux sont faits de particules de glace et de roche.",
    curiosites: [
      "Saturne est la seule planète du système solaire moins dense que l'eau.",
      "Ses anneaux s'étendent sur 282 000 km mais ne font que 10 mètres d'épaisseur.",
      'Saturne possède au moins 146 lunes connues, dont Titan qui a une atmosphère épaisse.',
      'Les vents sur Saturne peuvent atteindre 1 800 km/h.',
    ],
  },
  {
    id: 'uranus',
    nom: 'Uranus',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 19.19,
      excentricite: 0.047,
      periodeOrbitale: 30688.5,
      phaseInitiale: 1.2,
    },
    physique: {
      rayon: 25362,
      masse: '8,681 × 10²⁵ kg',
      densite: 1.27,
      gravite: 8.87,
      temperature: -195,
    },
    couleur: '#72B5C4',
    couleurSecondaire: '#5F9EA0',
    rayonAffichage: 11,
    anneaux: true,
    description:
      "Uranus est la septième planète du système solaire. C'est une géante de glace qui tourne littéralement « sur le côté » avec une inclinaison axiale de 98°.",
    composition:
      "Atmosphère d'hydrogène, hélium et méthane (qui donne sa couleur bleu-vert). Intérieur de glaces d'eau, méthane et ammoniac.",
    curiosites: [
      "Uranus tourne sur le côté avec une inclinaison de 98°, probablement due à une collision ancienne.",
      "Elle a été la première planète découverte à l'aide d'un télescope (1781 par William Herschel).",
      "Uranus possède 13 anneaux connus et 28 lunes.",
      "C'est la planète la plus froide du système solaire avec des températures minimales de -224°C.",
    ],
  },
  {
    id: 'neptune',
    nom: 'Neptune',
    type: 'planete',
    parent: 'soleil',
    orbite: {
      demiGrandAxe: 30.07,
      excentricite: 0.009,
      periodeOrbitale: 60182.0,
      phaseInitiale: 4.0,
    },
    physique: {
      rayon: 24622,
      masse: '1,024 × 10²⁶ kg',
      densite: 1.64,
      gravite: 11.15,
      temperature: -200,
    },
    couleur: '#4166F5',
    couleurSecondaire: '#1E3A8A',
    rayonAffichage: 11,
    description:
      "Neptune est la huitième et dernière planète du système solaire. C'est une géante de glace d'un bleu intense, avec les vents les plus rapides du système solaire.",
    composition:
      "Similaire à Uranus : hydrogène, hélium et méthane dans l'atmosphère. Intérieur de glaces et de roche.",
    curiosites: [
      "Les vents sur Neptune peuvent dépasser 2 100 km/h, les plus rapides du système solaire.",
      "Neptune a été découverte par le calcul mathématique avant d'être observée (1846).",
      "Une année sur Neptune dure environ 165 années terrestres.",
      "Sa lune Triton est l'un des objets les plus froids du système solaire (-235°C).",
    ],
  },
];

export const planetes = corpsCelestes.filter(
  (c) => c.type === 'planete'
);

export const getCorpsParId = (id: string): CorpsCeleste | undefined =>
  corpsCelestes.find((c) => c.id === id);
