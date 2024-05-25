<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);

useCanvas(canvas);
</script>

<template>
  <canvas ref="canvas"> Sorry, your browser doesn't support canvas. </canvas>
</template>
