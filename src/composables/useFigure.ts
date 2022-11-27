export const enum Figures {
  CUBE,
  OCTAHEDRON,
  TRIHEDRAL_PYRAMID,
  SQUARE_PYRAMID,
  PENTAGONAL_PYRAMID,
}

const currentFigure = ref<Figures>(Figures.PENTAGONAL_PYRAMID);

export const useFigure = () => {
  const setFigure = (figure: Figures) => {
    currentFigure.value = figure;
  };

  return {
    currentFigure,
    setFigure,
  };
};
