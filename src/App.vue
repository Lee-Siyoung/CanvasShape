<template>
  <canvas ref="canvas" width="800" height="500"></canvas>
  <ShapeButton @checkShape="checkShape" />
  <RedoUndo @clickUndo="undo" @clickRedo="redo" />
  <div class="colors">
    <span @click="changeColor('#000000')" style="--clr: #000000"></span>
    <span @click="changeColor('#ff0000')" style="--clr: #ff0000"></span>
    <span @click="changeColor('#0000ff')" style="--clr: #0000ff"></span>
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
import { Shape } from "./class/shape/Shape";
import { newShape } from "./class/shape/NewShape";
import { History, IHistory } from "./class/history/History";
import ShapeButton from "./components/ShapeButton.vue";
import RedoUndo from "./components/RedoUndo.vue";
import { click } from "./class/mouseEvent/Click";
import { mouseDown } from "./class/mouseEvent/MouseDown";
import { mouseMove } from "./class/mouseEvent/MouseMove";
import { mouseUp } from "./class/mouseEvent/MouseUp";
import { drawShape } from "./class/utils/DrawShape";
import { keyUp } from "./class/keyboardEvent/KeyUp";
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
    const changeColor = (color: string) => {
      console.log(color);
    };

    const redo = () => {
      state.history.redo(state.shapes);
      if (canvas.value && ctx.value) drawShape(canvas.value, ctx.value, state);
    };
    const undo = () => {
      state.history.undo(state.shapes);
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
      }
    };
    const onClick = (event: MouseEvent) => {
      if (canvas.value && ctx.value)
        click(canvas.value, ctx.value, state, event);
      console.log(state.shapes);
    };
    const onMouseDown = (event: MouseEvent) => {
      if (canvas.value) mouseDown(canvas.value, state, event);
    };
    const onMouseMove = (event: MouseEvent) => {
      if (canvas.value && ctx.value)
        mouseMove(canvas.value, ctx.value, state, event);
    };
    const onMouseUp = (event: MouseEvent) => {
      mouseUp(state, event);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (canvas.value && ctx.value)
        keyUp(canvas.value, ctx.value, state, event);
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
