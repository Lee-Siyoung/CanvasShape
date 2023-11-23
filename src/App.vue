<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <ShapeButton @checkShape="checkShape" />
  <RedoUndo @clickUndo="undo" @clickRedo="redo" />
  <div class="colors">
    <span @click="changeColor('#000000')" style="--clr: #000000"></span>
    <span @click="changeColor('#ff6347')" style="--clr: #ff6347"></span>
    <span @click="changeColor('#408fff')" style="--clr: #408fff"></span>
    <span @click="changeColor('#90ee90')" style="--clr: #90ee90"></span>
    <span @click="changeColor('#ff9f43')" style="--clr: #ff9f43"></span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  onBeforeUnmount,
} from "vue";

import ShapeButton from "./components/ShapeButton.vue";
import RedoUndo from "./components/RedoUndo.vue";
import { click } from "./class/mouseEvent/Click";
import { mouseDown } from "./class/mouseEvent/MouseDown";
import { mouseMove } from "./class/mouseEvent/MouseMove";
import { mouseUp } from "./class/mouseEvent/MouseUp";
import { drawShape } from "./class/utils/DrawShape";
import { keyUp } from "./class/keyboardEvent/KeyUp";
import { keyDown } from "./class/keyboardEvent/KeyDown";
import { Shape } from "./class/shape/Shape";
import { History, IHistory } from "./class/history/History";
import { newShape } from "./class/shape/newShape";
export default defineComponent({
  components: { ShapeButton, RedoUndo },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);
    const state = reactive({
      shapes: [] as Shape[],
      copyShape: null as Shape | null,
      history: new History([] as IHistory[], -1),
      mouseX: 0,
      mouseY: 0,
      oriX: 0,
      oriY: 0,
      oriW: 0,
      oriH: 0,
      ShapeIndex: 0,
      shapeId: 0,
      resizeHandleIndex: -1,
      isDragging: false,
      isResizing: false,
      isMovingArrow: false,
    });
    const changeColor = (color: string) => {
      state.shapes.forEach((shape) => {
        if (shape.isClick) {
          const oldColor = shape.color;
          shape.color = color;
          state.history.pushHistory({
            Color: {
              shapeId: shape.id,
              oldColor: oldColor,
              newColor: color,
            },
          });
        }
      });
      if (canvas.value && ctx.value) drawShape(canvas.value, ctx.value, state);
    };

    const redo = () => {
      state.history.redo(state.shapes);
      console.log(state.history);
      if (canvas.value && ctx.value) drawShape(canvas.value, ctx.value, state);
    };
    const undo = () => {
      state.history.undo(state.shapes);
      console.log(state.history);
      if (canvas.value && ctx.value) drawShape(canvas.value, ctx.value, state);
    };

    const checkShape = (Shape: string) => {
      if (canvas.value && ctx.value) {
        const IShape = newShape(state.shapeId, canvas.value, ctx.value, Shape);
        state.shapeId++;
        if (IShape) {
          state.history.pushHistory({
            Create: { shape: IShape },
          });
          state.shapes.push(IShape);
        }
        drawShape(canvas.value, ctx.value, state);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (
        canvas.value &&
        ctx.value &&
        canvas.value.contains(event.target as Node)
      )
        click(canvas.value, ctx.value, state, event);
      console.log(state.history);
    };
    const onMouseDown = (event: MouseEvent) => {
      if (canvas.value && canvas.value.contains(event.target as Node))
        mouseDown(canvas.value, state, event);
    };
    const onMouseMove = (event: MouseEvent) => {
      if (canvas.value && ctx.value)
        mouseMove(canvas.value, ctx.value, state, event);
    };
    const onMouseUp = (event: MouseEvent) => {
      if (canvas.value && ctx.value)
        mouseUp(canvas.value, ctx.value, state, event);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (canvas.value && ctx.value)
        keyUp(canvas.value, ctx.value, state, event);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (canvas.value && ctx.value)
        keyDown(canvas.value, ctx.value, state, event);
    };

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value?.getContext("2d");
        state.history.pushHistory({ Delete: { shape: state.shapes[0] } });
      }
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("keydown", onKeyDown);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    });

    return {
      canvas,
      ctx,
      state,
      checkShape,
      undo,
      redo,
      changeColor,
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin: 0;
  height: 100vh;
}
canvas {
  border: 1px solid black;
}
.colors {
  position: relative;
  padding: 30px 10px;
}
.colors span {
  position: relative;
  width: 50px;
  height: 20px;
  margin: 20px;
  cursor: pointer;
}
.colors span::before {
  content: "";
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  background: var(--clr);
  border-radius: 20px;
}
</style>
./class/keyboardEvent/KeyDown
