<script setup lang="ts">
const activeProjection = ref<number>(0);

const transformations = useTransformations();

onMounted(() => (activeProjection.value = transformations.projection.value));

const setActiveProjection = (index: number) => {
  activeProjection.value = index;
  transformations.setProjection(projectionsMenu[index].projection);
};
</script>

<template>
  <div class="container">
    <Accordion title="Перемещение">
      <FormRange
        v-for="(axis, i) in axes"
        :label="`${axis} =`"
        :min="-500"
        :max="500"
        :step="5"
        :current-value="transformations.translation[i]"
        :defaultValue="0"
        @change="transformations.setTranslation(i, $event)"
      />
    </Accordion>
    <Accordion title="Вращение">
      <FormRange
        v-for="(axis, i) in axes"
        :label="`${axis} =`"
        :min="0"
        :max="359"
        :step="1"
        :current-value="transformations.rotation[i]"
        :defaultValue="0"
        @change="transformations.setRotation(i, $event)"
      />
    </Accordion>
    <Accordion title="Масштабирование">
      <FormRange
        v-for="(axis, i) in axes"
        :key="axis"
        :label="`${axis} =`"
        :min="0.1"
        :max="5"
        :step="0.1"
        :current-value="transformations.scale[i]"
        :defaultValue="1"
        @change="transformations.setScale(i, $event)"
      />
    </Accordion>
    <Accordion title="Проекции">
      <GridContainer>
        <GridElement
          v-for="(projection, i) in projectionsMenu"
          :key="projection.title"
          :is-active="activeProjection === i"
          :title="projection.title"
          @click="setActiveProjection(i)"
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
