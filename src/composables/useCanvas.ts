const updateCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const { ctx } = initCanvas(canvas, width, height);

  const { currentFigure } = useFigure();

  useTransformations((translation, rotation, scale, prj) => {
    const matrix = mul([
      figuresMap[currentFigure.value].points,
      scaleMatrix(scale[0], scale[1], scale[2]),
      rotate(rotation[0], rotation[1], rotation[2]),
      translate(translation[0], translation[1], translation[2]),
      projectionsMap[prj](),
    ]);

    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = matrix[i][0] / matrix[i][3];
      matrix[i][1] = matrix[i][1] / matrix[i][3];
      matrix[i][2] = matrix[i][2] / matrix[i][3];
      matrix[i][3] = 1;
    }

    drawFigure(
      ctx,
      mul([matrix, translationMatrix(centerX, centerY)]),
      figuresMap[currentFigure.value].faces
    );
  });
};

export const useCanvas = (canvas: Ref<HTMLCanvasElement | null>) => {
  const { width, height } = useResizeObserver(document.body);

  watch([width, height], ([width, height]) => {
    if (!canvas.value) return;
    updateCanvas(canvas.value, width, height);
  });
};
