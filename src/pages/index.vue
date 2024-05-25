<script setup lang="ts">
const activeFigure = ref<number>(0);

const figure = useFigure();

onMounted(() => (activeFigure.value = figure.currentFigure.value));

const selectFigure = async (index: number) => {
  activeFigure.value = index;
  figure.setFigure(figuresMenu[index].figure);
  await navigateTo('/figure');
};
</script>

<template>
  <h1>Выберете фигуру</h1>
  <GridContainer>
    <GridElement
      v-for="(figure, i) in figuresMenu"
      :key="figure.title"
      :title="figure.title"
      :is-active="activeFigure === i"
      @click="selectFigure(i)"
    />
  </GridContainer>
</template>
