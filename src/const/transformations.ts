export const axes = ['x', 'y', 'z'];

export const projectionsMenu = [
  { projection: Projections.NONE, title: 'Без проекции' },
  { projection: Projections.ISOMETRIC, title: 'Изометрическая' },
  { projection: Projections.DIMETRIC, title: 'Диметрическая' },
  { projection: Projections.TRIMETRIC, title: 'Триметрическая' },
  {
    projection: Projections.ONE_POINT_PERSPECTIVE,
    title: 'Одноточечная перспектива',
  },
  {
    projection: Projections.TWO_POINT_PERSPECTIVE,
    title: 'Двухточечная перспектива',
  },
];

export const projectionsMap = {
  [Projections.NONE]: (): Point[] => identityMatrix,

  [Projections.ISOMETRIC]: (): Point[] => [
    [0.707, -0.408, 0, 0],
    [0, 0.816, 0, 0],
    [-0.707, -0.408, 1, 0],
    [0, 0, 0, 1],
  ],

  [Projections.DIMETRIC]: (): Point[] => [
    [0.926, 0.134, 0, 0],
    [0, 0.935, 0, 0],
    [0.378, -0.327, 0, 0],
    [0, 0, 0, 1],
  ],

  [Projections.TRIMETRIC]: (): Point[] => [
    [0.866, 0.354, 0, 0],
    [0, 0.707, 0, 0],
    [0.5, -0.612, 0, 0],
    [0, 0, 0, 1],
  ],

  [Projections.ONE_POINT_PERSPECTIVE]: (): Point[] => [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0.001],
    [0, 0, 0, 1],
  ],

  [Projections.TWO_POINT_PERSPECTIVE]: (): Point[] => [
    [1, 0, 0, 0.001],
    [0, 1, 0, 0.001],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
  ],
};
