<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
const showForm = ref<boolean>(false);
</script>

<template>
  <section class="block">
    <div class="header" @click="showForm = !showForm">
      <h2>{{ title }}</h2>
      <button class="button">
        <IconOpen :class="{ icon_close: showForm }" class="icon" />
      </button>
    </div>
    <div class="content" v-show="showForm">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.block {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 12px;
  user-select: none;
  cursor: pointer;
  padding: 8px 0;
}

.icon {
  transition: transform 0.2s;

  &_close {
    transform: rotate(180deg);
  }
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
