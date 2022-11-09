<script setup lang="ts">
const showMenu = ref<boolean>(true);
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <button v-if="!showMenu" class="button" @click="showMenu = true">
        <IconMenu/>
      </button>
      <template v-else>
        <div class="controls">
          <slot/>
        </div>
        <button class="button" @click="showMenu = false">
          <IconHide/>
        </button>
      </template>
    </div>
    <canvas class="canvas"/>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
}

.content {
  position: relative;
  height: max-content;
  margin: 20px;
  display: flex;
  column-gap: 16px;
}

.controls {
  position: relative;
  box-sizing: border-box;
  padding: 28px 24px;
  background-color: white;
  border-radius: 8px;
  width: 480px;
  height: max-content;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  border: var(--border);
  box-shadow: var(--shadow);
  z-index: 2;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.button {
  margin-top: 8px;
  z-index: 3;
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
