// Types
export const enum Projections {
  NONE,
  ISOMETRIC,
  DIMETRIC,
  TRIMETRIC,
  ONE_POINT_PERSPECTIVE,
  TWO_POINT_PERSPECTIVE,
}

export type XYZ = [number, number, number];

type fn =
  | ((
      translation: XYZ,
      rotation: XYZ,
      scale: XYZ,
      projection: Projections
    ) => void)
  | null;

// Composable
const translation = reactive<XYZ>([0, 0, 0]);
const rotation = reactive<XYZ>([0, 0, 0]);
const scale = reactive<XYZ>([1, 1, 1]);
const projection = ref<Projections>(Projections.NONE);

const setTranslation = (axis: number, value: number) => {
  translation[axis] = value;
};

const setRotation = (axis: number, value: number) => {
  rotation[axis] = value;
};

const setScale = (axis: number, value: number) => {
  scale[axis] = value;
};

const setProjection = (value: Projections) => {
  projection.value = value;
};

export const useTransformations = (onUpdate: fn = null) => {
  watchEffect(() => {
    if (onUpdate) onUpdate(translation, rotation, scale, projection.value);
  });

  return {
    translation,
    rotation,
    scale,
    projection,
    setTranslation,
    setRotation,
    setScale,
    setProjection,
  };
};
