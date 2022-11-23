<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvas.value) return;

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  const ctx = canvas.value.getContext("2d");

  if (!ctx) return;

  ctx.fillStyle = "red";

  type Point = [number, number, number, number];

  const points: Point[] = [
    [500, 500, 500, 1],
    [500, 500, 700, 1],
    [500, 700, 500, 1],
    [500, 700, 700, 1],
    [700, 500, 500, 1],
    [700, 500, 700, 1],
    [700, 700, 500, 1],
    [700, 700, 700, 1],
  ];

  const faces: [number, number, number, number][] = [
    [0, 1, 3, 2],
    [0, 1, 5, 4],
    [0, 2, 6, 4],
    [1, 3, 7, 5],
    [2, 3, 7, 6],
    [4, 5, 7, 6],
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

  // Translate
  const translate = (x: number, y: number, z: number): Point[] => {
    return [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ];
  };

  // Identity matrix
  const identity = (): Point[] => {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
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

  // Draw figure
  const drawFigure = (points: Point[], faces: [number, number, number, number][]) => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    faces.forEach((face) => {
      ctx.beginPath();
      ctx.moveTo(points[face[0]][0], points[face[0]][1]);
      ctx.lineTo(points[face[1]][0], points[face[1]][1]);
      ctx.lineTo(points[face[2]][0], points[face[2]][1]);
      ctx.lineTo(points[face[3]][0], points[face[3]][1]);
      ctx.closePath();
      ctx.stroke();
    });
  };

  // Rotation animation all axis on the center of the canvas
  let angle = 0;

  const animate = () => {
    const matrix = multiply(
      multiply(
        multiply(
          translate(canvas.value.width / 2, canvas.value.height / 2, 0),
          rotateX(angle)
        ),
        rotateY(angle)
      ),
      rotateZ(angle)
    );

    const rotatedPoints = multiply(points, matrix);

    drawFigure(rotatedPoints, faces);

    angle += angle < 360 ? 1 : -360;

    requestAnimationFrame(animate);
  };

  animate();
});
</script>

<template>
  <canvas ref="canvas">
    Sorry, your browser doesn't support canvas.
  </canvas>
</template>
