<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvas.value) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  const ctx = canvas.value.getContext('2d');

  if (!ctx) return;

  ctx.fillStyle = 'red';

  type Point = [number, number, number, number];

  const sizeX = canvas.value.width;
  const sizeY = canvas.value.height;

  const centerX = sizeX / 2;
  const centerY = sizeY / 2;

  const figureSize = 200;

  const figureList = {
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
        [0, 0, figureSize, 1],
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
        [0, 0, figureSize, 1],
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

  const identityMatrix: Point[] = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  const translationMatrix: Point[] = [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [centerX, centerY, 0, 1],
  ];

  // Rotate around X axis
  const rotateX = (angle: number): Point[] => {
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

  // Rotate around Y axis
  const rotateY = (angle: number): Point[] => {
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

  // Rotate around Z axis
  const rotateZ = (angle: number): Point[] => {
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

  const rotate = (x: number, y: number, z: number): Point[] => {
    return mul([rotateX(x), rotateY(y), rotateZ(z)]);
  };

  // Translate
  const translate = (x: number, y: number, z: number): Point[] => {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [x, y, z, 1],
    ];
  };

  // Scale
  const scaleMatrix = (x: number, y: number, z: number): Point[] => {
    return [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1],
    ];
  };

  const projections = {
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

  const mul = (matrices: Point[][]) => {
    let result = matrices[0];

    for (let i = 1; i < matrices.length; i++) {
      result = multiply(result, matrices[i]);
    }

    return result;
  };

  // Draw figure
  const drawFigure = (points: Point[], faces: number[][]) => {
    ctx.clearRect(0, 0, sizeX, sizeY);

    for (const face of faces) {
      ctx.beginPath();

      for (let i = 0; i < face.length; i++) {
        const [x, y] = points[face[i]];

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.stroke();
    }
  };

  const { currentFigure } = useFigure();

  useTransformations((translation, rotation, scale, prj) => {
    const matrix = mul([
      figureList[currentFigure.value].points,
      scaleMatrix(scale[0], scale[1], scale[2]),
      rotate(rotation[0], rotation[1], rotation[2]),
      translate(translation[0], translation[1], translation[2]),
      projections[prj](),
    ]);

    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = matrix[i][0] / matrix[i][3];
      matrix[i][1] = matrix[i][1] / matrix[i][3];
      matrix[i][2] = matrix[i][2] / matrix[i][3];
      matrix[i][3] = 1;
    }

    drawFigure(
      mul([matrix, translationMatrix]),
      figureList[currentFigure.value].faces
    );
  });
});
</script>

<template>
  <canvas ref="canvas"> Sorry, your browser doesn't support canvas. </canvas>
</template>
