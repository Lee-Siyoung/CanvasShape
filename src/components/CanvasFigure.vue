<template>
  <canvas ref="canvas"></canvas>
  <CreateButton :canvas="canvas" :ctx="ctx" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import CreateButton from "./CreateButton.vue";

export default defineComponent({
  components: { CreateButton },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
      }
    });
    return { canvas, ctx };
  },
});
</script>

<style scoped>
canvas {
  width: 800px;
  height: 500px;
  border: 1px solid black;
}
</style>
