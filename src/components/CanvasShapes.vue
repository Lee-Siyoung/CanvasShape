<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <CreateButton :canvas="canvas" :ctx="ctx" @addShape="addShape" />
  <DragShapes
    v-if="canvas !== null"
    :canvas="canvas"
    :ctx="ctx"
    :shapes="state.shapes"
  />
  <DeleteShapes
    :canvas="canvas"
    :ctx="ctx"
    :shapes="state.shapes"
    @deleteShapes="deleteShapes"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import CreateButton from "./CreateButton.vue";
import DragShapes from "./DragShapes.vue";
import DeleteShapes from "./DeleteShapes.vue";

interface Rectangle {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  click: boolean;
}
interface Triangle {
  type: "triangle";
  x: number;
  y: number;
  height: number;
  base: number;
  click: boolean;
}
interface Circle {
  type: "circle";
  x: number;
  y: number;
  radius: number;
  click: boolean;
}
type Shape = Triangle | Circle | Rectangle;
export default defineComponent({
  components: { CreateButton, DragShapes, DeleteShapes },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);

    const state = reactive({
      shapes: [] as Shape[],
      isPointShape: false,
    });
    const addShape = (shape: Shape) => {
      state.shapes.push(shape);
    };
    const deleteShapes = (toDeleteShapes: Shape[]) => {
      const updatedShapes = state.shapes.filter(
        (shape) => !toDeleteShapes.includes(shape)
      );
      state.shapes = updatedShapes;
    };

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
      }
    });
    return { canvas, ctx, state, addShape, deleteShapes };
  },
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
