<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <CreateButton :canvas="canvas" :ctx="ctx" @addShape="addShape" />
  <DragShapes
    v-if="canvas !== null"
    :canvas="canvas"
    :ctx="ctx"
    :shapes="state.shapes"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import CreateButton from "./CreateButton.vue";
import DragShapes from "./DragShapes.vue";
interface Rectangle {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Triangle {
  type: "triangle";
  x: number;
  y: number;
  height: number;
  base: number;
}
interface Circle {
  type: "circle";
  x: number;
  y: number;
  radius: number;
}
type Shape = Triangle | Circle | Rectangle;
export default defineComponent({
  components: { CreateButton, DragShapes },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);

    const state = reactive({
      shapes: [] as Shape[],
    });
    const addShape = (shape: Shape) => {
      state.shapes.push(shape);
    };

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
      }
    });
    return { canvas, ctx, state, addShape };
  },
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
