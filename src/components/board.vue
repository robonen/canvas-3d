<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");

  if (!ctx) return;

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, Math.random() * 100, Math.random() * 100);
});
</script>

<template>
  <canvas ref="canvas" />
</template>
