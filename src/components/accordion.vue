<script setup lang="ts">
const {title} = defineProps<{ title: string }>();
const showForm = ref<boolean>(false);
</script>

<template>
  <section class="block">
    <div class="header" @click="showForm = !showForm">
      <h2 class="title">{{ title }}</h2>
      <button class="button">
        <IconClose v-if="showForm"/>
        <IconOpen v-else/>
      </button>
    </div>
    <div class="content" v-if="showForm">
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 12px;
  user-select: none;
  cursor: pointer;
  padding: 8px 0;
}

.title {
  font-size: 1.04rem;
  font-weight: 500;
}

.button {
  color: var(--icon-color);
}

.content {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 0 4px;
}
</style>
