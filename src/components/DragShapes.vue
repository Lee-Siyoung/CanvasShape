<template>
  <div></div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  onBeforeUnmount,
  onMounted,
} from "vue";

import { Shape } from "../class/shape";
export default defineComponent({
  props: {
    canvas: {
      type: Object as PropType<HTMLCanvasElement | null>,
      required: true,
    },
    ctx: {
      type: Object as PropType<CanvasRenderingContext2D | null>,
    },
    shapes: {
      type: Array as PropType<Shape[]>,
      required: true,
    },
  },
  setup(props) {
    const { canvas, ctx, shapes } = toRefs(props);
    const state = reactive({
      startX: 0,
      startY: 0,
      ShapeIndex: 0,
      isDragging: false,
      clickColor: "red",
      notClickColor: "black",
    });
    const onClick = (event: MouseEvent) => {
      if (canvas.value) {
        event.preventDefault();
        for (let shape of shapes.value) {
          if (shape.isPointInside(state.startX, state.startY)) {
            shape.toggleClick();
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
        for (let shape of shapes.value) {
          if (shape.isPointInside(state.startX, state.startY)) {
            state.ShapeIndex = index;
            state.isDragging = true;
            shape.toggleClick();
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
      for (let shape of shapes.value) {
        if (shape.isPointInside(state.startX, state.startY)) {
          shape.toggleClick();
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
          const currentShape = shapes.value[state.ShapeIndex];
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
        for (let shape of shapes.value) {
          if (shape.isClick) {
            ctx.value.strokeStyle = state.clickColor;
          } else {
            ctx.value.strokeStyle = state.notClickColor;
          }
          shape.draw(ctx.value);
        }
      }
    };
    onMounted(() => {
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mouseout", onMouseOut);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("click", onClick);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    });
    return {
      state,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onMouseMove,
      onClick,
    };
  },
});
</script>

<style scoped></style>
