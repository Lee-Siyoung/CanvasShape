<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <ShapeButton @checkShape="checkShape" />
  <RedoUndo @clickUndo="undo" @clickRedo="redo" />
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
import { History, IHistory } from "./class/history";
import ShapeButton from "./components/ShapeButton.vue";
import RedoUndo from "./components/RedoUndo.vue";
export default defineComponent({
  components: { ShapeButton, RedoUndo },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);
    const state = reactive({
      shapes: [] as Shape[],
      mouseX: 0,
      mouseY: 0,
      oriX: 0,
      oriY: 0,
      ShapeIndex: 0,
      isDragging: false,
      clickColor: "red",
      notClickColor: "black",
      shapeId: 0,
      history: new History([] as IHistory[], -1),
    });
    const redo = () => {
      state.history.redo(state.shapes);
      drawShape();
    };
    const undo = () => {
      state.history.undo(state.shapes);
      drawShape();
    };

    const checkShape = (Shape: string) => {
      if (canvas.value && ctx.value) {
        const IShape = newShape(state.shapeId, canvas.value, ctx.value, Shape);
        state.shapeId++;
        if (IShape) {
          state.history.pushHistory({ type: "create", shape: IShape });
          state.shapes.push(IShape);
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      if (canvas.value) {
        event.preventDefault();
        if (event.ctrlKey) {
          for (const shape of state.shapes) {
            if (shape.isPointInside(state.mouseX, state.mouseY)) {
              shape.selectClick();
            }
          }
        } else {
          for (const shape of state.shapes) {
            if (shape.isPointInside(state.mouseX, state.mouseY)) {
              shape.selectClick();
            } else {
              shape.isClick = false;
            }
          }
        }
        drawShape();
      }
    };
    const onMouseDown = (event: MouseEvent) => {
      if (canvas.value) {
        event.preventDefault();
        state.mouseX =
          event.clientX - canvas.value?.getBoundingClientRect().left;
        state.mouseY =
          event.clientY - canvas.value?.getBoundingClientRect().top;
        let index = 0;
        if (event.ctrlKey) {
          for (const shape of state.shapes) {
            if (shape.isPointInside(state.mouseX, state.mouseY)) {
              state.ShapeIndex = index;
              state.oriX = state.shapes[state.ShapeIndex].x;
              state.oriY = state.shapes[state.ShapeIndex].y;
              state.isDragging = true;
              shape.selectClick();
            }
            index++;
          }
        } else {
          for (const shape of state.shapes) {
            if (shape.isPointInside(state.mouseX, state.mouseY)) {
              state.ShapeIndex = index;
              state.oriX = state.shapes[state.ShapeIndex].x;
              state.oriY = state.shapes[state.ShapeIndex].y;
              state.isDragging = true;
              shape.selectClick();
            } else {
              shape.isClick = false;
            }
            index++;
          }
        }
      }
    };
    const onMouseUp = (event: MouseEvent) => {
      if (!state.isDragging) {
        return;
      }
      event.preventDefault();
      const moveShape = state.shapes[state.ShapeIndex];
      if (state.oriX !== moveShape.x && state.oriY !== moveShape.y) {
        state.history.pushHistory({
          type: "move",
          shapeId: moveShape.id,
          oldX: state.oriX,
          oldY: state.oriY,
          newX: moveShape.x,
          newY: moveShape.y,
        });
      }
      state.isDragging = false;
      for (const shape of state.shapes) {
        if (shape.isPointInside(state.mouseX, state.mouseY)) {
          shape.selectClick();
        }
      }
    };
    const onMouseMove = (event: MouseEvent) => {
      if (!state.isDragging) return;
      else {
        event.preventDefault();
        if (canvas.value) {
          const moveX =
            event.clientX - canvas.value?.getBoundingClientRect().left;
          const moveY =
            event.clientY - canvas.value?.getBoundingClientRect().top;
          state.shapes[state.ShapeIndex].x += moveX - state.mouseX;
          state.shapes[state.ShapeIndex].y += moveY - state.mouseY;
          drawShape();
          state.mouseX = moveX;
          state.mouseY = moveY;
        }
      }
    };
    const drawShape = () => {
      if (canvas.value && ctx.value) {
        ctx.value?.clearRect(0, 0, canvas.value?.width, canvas.value?.height);
        for (const shape of state.shapes) {
          ctx.value.strokeStyle = shape.isClick
            ? state.clickColor
            : state.notClickColor;
          shape.draw(ctx.value);
        }
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        const deleteShapes = state.shapes.filter((shape) => shape.isClick);
        for (const shape of deleteShapes) {
          state.history.pushHistory({ type: "delete", shape });
        }
        state.shapes = state.shapes.filter((shape) => !shape.isClick);
        drawShape();
      }
    };
    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
        state.history.pushHistory({ type: "delete", shape: state.shapes[0] });
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
      checkShape,
      undo,
      redo,
    };
  },
});
</script>
<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
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
