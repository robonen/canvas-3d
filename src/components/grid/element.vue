<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    isActive?: boolean;
  }>(),
  {
    isActive: false,
  }
);
</script>

<template>
  <button class="block" :class="{ block_active: isActive }">
    <div class="picture"></div>
    <div v-if="title" class="title">{{ title }}</div>
  </button>
</template>

<style scoped lang="scss">
.block {
  font-family: 'Formular', sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  row-gap: 8px;
  width: 100%;
  height: 200px;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  background-color: #fae9ef;
  color: #67122c;
  padding: 16px;
  font-size: 17px;
  transition:
    background-color 0.2s,
    transform 0.2s;

  &_active {
    background-color: #fdd2e2;
  }

  &:hover {
    background-color: #fdd2e2;
  }

  &:active {
    transform: scale(0.98);
  }
}

.picture {
  width: 48px;
  height: 48px;
  margin: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.title {
  width: 100%;
  margin-top: 8px;
  text-align: left;
}
</style>
