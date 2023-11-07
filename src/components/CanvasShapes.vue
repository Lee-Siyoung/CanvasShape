<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <ShapeButton :canvas="canvas" :ctx="ctx" @addShape="addShape" />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  onBeforeUnmount,
} from "vue";
import { Shape } from "../class/shape";
import ShapeButton from "./ShapeButton.vue";

export default defineComponent({
  components: { ShapeButton },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);

    const state = reactive({
      shapes: [] as Shape[],
      startX: 0,
      startY: 0,
      ShapeIndex: 0,
      isDragging: false,
      clickColor: "red",
      notClickColor: "black",
    });

    const addShape = (shape: Shape) => {
      state.shapes.push(shape);
    };

    const onClick = (event: MouseEvent) => {
      if (canvas.value) {
        event.preventDefault();
        for (let shape of state.shapes) {
          if (shape.isPointInside(state.startX, state.startY)) {
            shape.selectClick();
          }
        }
        draw_shape();
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      if (canvas.value) {
        event.preventDefault();
        state.startX =
          event.clientX - canvas.value?.getBoundingClientRect().left;
        state.startY =
          event.clientY - canvas.value?.getBoundingClientRect().top;
        let index = 0;
        for (let shape of state.shapes) {
          if (shape.isPointInside(state.startX, state.startY)) {
            state.ShapeIndex = index;
            state.isDragging = true;
            shape.selectClick();
            return;
          }
          index++;
        }
      }
    };
    const onMouseUp = (event: MouseEvent) => {
      if (!state.isDragging) {
        return;
      }
      event.preventDefault();
      state.isDragging = false;
      for (let shape of state.shapes) {
        if (shape.isPointInside(state.startX, state.startY)) {
          shape.selectClick();
          return;
        }
      }
    };
    const onMouseOut = (event: MouseEvent) => {
      if (!state.isDragging) {
        return;
      }
      event.preventDefault();
    };
    const onMouseMove = (event: MouseEvent) => {
      if (!state.isDragging) return;
      else {
        event.preventDefault();
        if (canvas.value) {
          const mouseX =
            event.clientX - canvas.value?.getBoundingClientRect().left;
          const mouseY =
            event.clientY - canvas.value?.getBoundingClientRect().top;
          const currentShape = state.shapes[state.ShapeIndex];
          const dx = mouseX - state.startX;
          const dy = mouseY - state.startY;
          currentShape.x += dx;
          currentShape.y += dy;
          draw_shape();
          state.startX = mouseX;
          state.startY = mouseY;
        }
      }
    };
    const draw_shape = () => {
      if (canvas.value && ctx.value) {
        ctx.value?.clearRect(0, 0, canvas.value?.width, canvas.value?.height);
        for (let shape of state.shapes) {
          if (shape.isClick) {
            ctx.value.strokeStyle = state.clickColor;
          } else {
            ctx.value.strokeStyle = state.notClickColor;
          }
          shape.draw(ctx.value);
        }
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        state.shapes = state.shapes.filter((shape) => !shape.isClick);
        draw_shape();
      }
    };
    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
      }
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mouseout", onMouseOut);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);
      window.addEventListener("keyup", onKeyUp);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keyup", onKeyUp);
    });

    return {
      canvas,
      ctx,
      state,
      addShape,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onMouseMove,
      onClick,
      onKeyUp,
    };
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
