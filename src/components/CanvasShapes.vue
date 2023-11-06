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
import { Shape } from "../class/shape";
import CreateButton from "./CreateButton.vue";
import DragShapes from "./DragShapes.vue";
import DeleteShapes from "./DeleteShapes.vue";

export default defineComponent({
  components: { CreateButton, DragShapes, DeleteShapes },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);

    const state = reactive({
      shapes: [] as Shape[],
    });

    const addShape = (shape: Shape) => {
      state.shapes.push(shape);
      console.log(state.shapes);
    };

    const deleteShapes = (toDeleteShapes: Shape[]) => {
      state.shapes = toDeleteShapes;
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
div {
  margin: 0;
  height: 100vh;
}
canvas {
  border: 1px solid black;
}
</style>
