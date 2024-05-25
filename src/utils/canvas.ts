export function initCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  _dpi?: number
) {
  const ctx = canvas.getContext('2d')!;

  const dpr = window.devicePixelRatio || 1;

  const bsr =
    // @ts-expect-error vendor prefix
    ctx.webkitBackingStorePixelRatio ||
    // @ts-expect-error vendor prefix
    ctx.mozBackingStorePixelRatio ||
    // @ts-expect-error vendor prefix
    ctx.msBackingStorePixelRatio ||
    // @ts-expect-error vendor prefix
    ctx.oBackingStorePixelRatio ||
    // @ts-expect-error vendor prefix
    ctx.backingStorePixelRatio ||
    1;

  const dpi = _dpi || dpr / bsr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  ctx.scale(dpi, dpi);

  return { ctx, dpi };
}

export function drawFigure(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  faces: number[][]
) {
  requestAnimationFrame(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
  });
}
