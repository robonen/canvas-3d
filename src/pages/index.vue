<script setup lang="ts">
const allFigures = [
  { figure: Figures.CUBE, title: 'Куб' },
  { figure: Figures.OCTAHEDRON, title: 'Октаэдр' },
  { figure: Figures.TRIHEDRAL_PYRAMID, title: 'Трехгранная пирамида' },
  { figure: Figures.SQUARE_PYRAMID, title: 'Четырехгранная пирамида' },
  { figure: Figures.PENTAGONAL_PYRAMID, title: 'Пятигранная пирамиида' },
];

const activeFigure = ref<number>(0);

const figure = useFigure();

onMounted(() => (activeFigure.value = figure.currentFigure.value));

const selectFigure = (index: number) => {
  activeFigure.value = index;
  figure.setFigure(allFigures[index].figure);
  navigateTo('/figure');
};
</script>

<template>
  <h1>Выберете фигуру</h1>
  <GridContainer>
    <GridElement
      v-for="(figure, i) in allFigures"
      :key="figure.title"
      :title="figure.title"
      :is-active="activeFigure === i"
      @click="selectFigure(i)"
    />
  </GridContainer>
</template>
