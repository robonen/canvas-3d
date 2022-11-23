<script setup lang="ts">
const figures = ['Тетраэдр', 'Гексаэдр', 'Октаэдр', 'Додекаэдр', 'Икосаэдр'];
</script>

<template>
  <h1>Выберете фигуру</h1>
  <GridContainer>
    <GridElement v-for="figure in figures" :key="figure" :title="figure" />
  </GridContainer>
</template>
