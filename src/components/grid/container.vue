<template>
  <div class="grid">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
