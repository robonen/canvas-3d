export type XYZ = [number, number, number];

type fn = ((translation: XYZ, rotation: XYZ, scale: XYZ) => void) | null;

const translation = reactive<XYZ>([0, 0, 0]);
const rotation = reactive<XYZ>([0, 0, 0]);
const scale = reactive<XYZ>([1, 1, 1]);

const setTranslation = (axis: number, value: number) => {
  translation[axis] = value;
};

const setRotation = (axis: number, value: number) => {
  rotation[axis] = value;
};

const setScale = (axis: number, value: number) => {
  scale[axis] = value;
};

export const useTransformations = (onUpdate: fn = null) => {
  watchEffect(() => {
    if (onUpdate) onUpdate(translation, rotation, scale);
  });

  return {
    translation,
    rotation,
    scale,
    setTranslation,
    setRotation,
    setScale,
  };
};
