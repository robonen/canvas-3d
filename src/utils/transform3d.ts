export type Point = [number, number, number, number];

export const identityMatrix: Point[] = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

export const translationMatrix = (
  centerX: number,
  centerY: number
): Point[] => [
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [centerX, centerY, 0, 1],
];

export const rotateX = (angle: number): Point[] => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return [
    [1, 0, 0, 0],
    [0, cos, -sin, 0],
    [0, sin, cos, 0],
    [0, 0, 0, 1],
  ];
};

export const rotateY = (angle: number): Point[] => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return [
    [cos, 0, sin, 0],
    [0, 1, 0, 0],
    [-sin, 0, cos, 0],
    [0, 0, 0, 1],
  ];
};

export const rotateZ = (angle: number): Point[] => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return [
    [cos, -sin, 0, 0],
    [sin, cos, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};

export const rotate = (x: number, y: number, z: number): Point[] => {
  return mul([rotateX(x), rotateY(y), rotateZ(z)]);
};

// Translate
export const translate = (x: number, y: number, z: number): Point[] => {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [x, y, z, 1],
  ];
};

// Scale
export const scaleMatrix = (x: number, y: number, z: number): Point[] => {
  return [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1],
  ];
};

// Multiply array of points by matrix
const multiply = (points: Point[], matrix: Point[]): Point[] => {
  const result: Point[] = [];

  for (const point of points) {
    const [x, y, z, w] = point;

    const [x1, y1, z1, w1] = matrix[0];
    const [x2, y2, z2, w2] = matrix[1];
    const [x3, y3, z3, w3] = matrix[2];
    const [x4, y4, z4, w4] = matrix[3];

    result.push([
      x * x1 + y * x2 + z * x3 + w * x4,
      x * y1 + y * y2 + z * y3 + w * y4,
      x * z1 + y * z2 + z * z3 + w * z4,
      x * w1 + y * w2 + z * w3 + w * w4,
    ]);
  }

  return result;
};

export const mul = (matrices: Point[][]) => {
  let result = matrices[0];

  for (let i = 1; i < matrices.length; i++) {
    result = multiply(result, matrices[i]);
  }

  return result;
};
