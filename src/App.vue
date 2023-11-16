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
import { Shape } from "./class/shape/shape";
import { newShape } from "./class/newShape";
import { History, IHistory } from "./class/history/history";
import ShapeButton from "./components/ShapeButton.vue";
import RedoUndo from "./components/RedoUndo.vue";
import { MouseEventClass } from "./class/mouseEvent/mouseEvent";
import { keyboardEventClass } from "./class/keyboardEvent";
import { click } from "./class/mouseEvent/Click";
import { mouseDown } from "./class/mouseEvent/MouseDown";
import { mouseMove } from "./class/mouseEvent/MouseMove";
import { mouseUp } from "./class/mouseEvent/MouseUp";
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
    const mouseEvent = new MouseEventClass(state);
    const KeyboardEventClass = new keyboardEventClass(state);
    const redo = () => {
      state.history.redo(state.shapes);
      if (canvas.value && ctx.value)
        mouseEvent.drawShape(canvas.value, ctx.value);
    };
    const undo = () => {
      state.history.undo(state.shapes);
      if (canvas.value && ctx.value)
        mouseEvent.drawShape(canvas.value, ctx.value);
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
        click(canvas.value, ctx.value, state, event, mouseEvent);
    };
    const onMouseDown = (event: MouseEvent) => {
      if (canvas.value) mouseDown(canvas.value, state, event);
    };
    const onMouseMove = (event: MouseEvent) => {
      if (canvas.value && ctx.value)
        mouseMove(canvas.value, ctx.value, state, event, mouseEvent);
    };
    const onMouseUp = (event: MouseEvent) => {
      mouseUp(state, event);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (canvas.value && ctx.value)
        KeyboardEventClass.onKeyUp(canvas.value, ctx.value, event, mouseEvent);
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
./class/mouseEvent/mouseEvent
