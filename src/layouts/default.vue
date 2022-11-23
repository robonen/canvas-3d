<script setup lang="ts">
const showMenu = ref<boolean>(false);
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <button
        v-if="!showMenu"
        class="button button__show"
        @click="showMenu = true"
      >
        <IconMenu />
      </button>
      <template v-else>
        <div class="controls">
          <slot />
        </div>
        <button class="button button__hide" @click="showMenu = false">
          <IconHide />
        </button>
      </template>
    </div>
    <Board class="canvas" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.content {
  position: relative;
  height: max-content;
  padding: 20px;
  display: flex;
  column-gap: 16px;
  max-height: 100%;
}

.controls {
  position: relative;
  padding: 28px 24px;
  background-color: white;
  border-radius: 8px;
  width: 480px;
  max-height: calc(100% - 40px);
  overflow: auto;
  border: var(--border);
  box-shadow: var(--shadow);
  z-index: 2;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.button {
  margin-top: 8px;
  z-index: 3;
}

.button__show {
  width: 25px;
  height: 25px;
}

.button__hide {
  width: 22px;
  height: 22px;
}

.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
