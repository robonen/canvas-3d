<script setup lang="ts">
const axes = ['x', 'y', 'z'];
const projections = [
  'Без проекции',
  'Изометрическая',
  'Диметрическая',
  'Триметрическая',
  'Одноточечная перспективная',
  'Двухточечная перспективная',
];

const activeProjection = ref<number>(0);
</script>

<template>
  <div class="container">
    <Accordion title="Перемещение">
      <FormRange
        v-for="axis in axes"
        :label="`${axis} =`"
        :min="-10"
        :max="10"
        :step="0.1"
        :defaultValue="0"
      />
    </Accordion>
    <Accordion title="Вращение">
      <FormRange
        v-for="axis in axes"
        :label="`${axis} =`"
        :min="0"
        :max="359"
        :step="1"
        :defaultValue="0"
      />
    </Accordion>
    <Accordion title="Масштабирование">
      <FormRange
        v-for="axis in axes"
        :key="axis"
        :label="`${axis} =`"
        :min="0.1"
        :max="5"
        :step="0.1"
        :defaultValue="1"
      />
    </Accordion>
    <Accordion title="Проекции">
      <GridContainer>
        <GridElement
          v-for="(projection, i) in projections"
          :key="projection"
          :is-active="activeProjection === i"
          :title="projection"
          @click="activeProjection = i"
        />
      </GridContainer>
    </Accordion>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
