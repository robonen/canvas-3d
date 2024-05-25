export const figuresMenu = [
  { figure: Figures.CUBE, title: 'Куб' },
  { figure: Figures.OCTAHEDRON, title: 'Октаэдр' },
  { figure: Figures.TRIHEDRAL_PYRAMID, title: 'Трехгранная пирамида' },
  { figure: Figures.SQUARE_PYRAMID, title: 'Четырехгранная пирамида' },
  { figure: Figures.PENTAGONAL_PYRAMID, title: 'Пятигранная пирамиида' },
];

export const figuresMap = {
  [Figures.CUBE]: {
    points: [
      [0, 0, 0, 1],
      [0, 0, 200, 1],
      [0, 200, 0, 1],
      [0, 200, 200, 1],
      [200, 0, 0, 1],
      [200, 0, 200, 1],
      [200, 200, 0, 1],
      [200, 200, 200, 1],
    ] as Point[],
    faces: [
      [0, 1, 3, 2],
      [0, 1, 5, 4],
      [0, 2, 6, 4],
      [1, 3, 7, 5],
      [2, 3, 7, 6],
      [4, 5, 7, 6],
    ],
  },

  [Figures.OCTAHEDRON]: {
    points: [
      [0, 0, 100, 1],
      [100, 100, 0, 1],
      [100, -100, 0, 1],
      [-100, -100, 0, 1],
      [-100, 100, 0, 1],
      [0, 0, -100, 1],
    ] as Point[],
    faces: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [5, 1, 2],
      [5, 2, 3],
      [5, 3, 4],
      [5, 4, 1],
    ],
  },

  [Figures.TRIHEDRAL_PYRAMID]: {
    points: [
      [0, 0, 100, 1],
      [0, 80, 0, 1],
      [86.6, -50, 0, 1],
      [-86.6, -50, 0, 1],
    ] as Point[],
    faces: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 2, 3],
    ],
  },

  [Figures.SQUARE_PYRAMID]: {
    points: [
      [0, 0, 200, 1],
      [100, 100, 0, 1],
      [100, -100, 0, 1],
      [-100, -100, 0, 1],
      [-100, 100, 0, 1],
    ] as Point[],
    faces: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [1, 2, 3, 4],
    ],
  },

  [Figures.PENTAGONAL_PYRAMID]: {
    points: [
      [0, 0, 200, 1],
      [0, 100, 0, 1],
      [95.1, 30.9, 0, 1],
      [58.8, -80.9, 0, 1],
      [-58.8, -80.9, 0, 1],
      [-95.1, 30.9, 0, 1],
    ] as Point[],
    faces: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [0, 5, 1],
      [1, 2, 3, 4, 5],
    ],
  },
};
