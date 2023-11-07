<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <ShapeButton @CheckShape="checkShape" />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  onBeforeUnmount,
} from "vue";
import { Shape } from "./class/shape";
import { newShape } from "./class/newShape";
import ShapeButton from "./components/ShapeButton.vue";

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
    const checkShape = (test: string) => {
      if (canvas.value && ctx.value) {
        const IShape = newShape(canvas.value, ctx.value, test);
        if (IShape) {
          state.shapes.push(IShape);
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      if (canvas.value) {
        event.preventDefault();
        for (const shape of state.shapes) {
          if (shape.isPointInside(state.startX, state.startY)) {
            shape.selectClick();
          }
        }
        drawShape();
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
        for (const shape of state.shapes) {
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
      for (const shape of state.shapes) {
        if (shape.isPointInside(state.startX, state.startY)) {
          shape.selectClick();
          return;
        }
      }
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
          drawShape();
          state.startX = mouseX;
          state.startY = mouseY;
        }
      }
    };
    const drawShape = () => {
      if (canvas.value && ctx.value) {
        ctx.value?.clearRect(0, 0, canvas.value?.width, canvas.value?.height);
        for (const shape of state.shapes) {
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
        drawShape();
      }
    };
    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
      }
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);
      window.addEventListener("keyup", onKeyUp);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keyup", onKeyUp);
    });

    return {
      canvas,
      ctx,
      state,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onClick,
      onKeyUp,
      checkShape,
    };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  height: 100vh;
}
canvas {
  border: 1px solid black;
}
</style>
