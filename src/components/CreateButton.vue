<template>
  <div>
    <button @click="drawRectangle">사각형</button>
    <button @click="drawTriangle">삼각형</button>
    <button @click="drawCircle">원</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";

export default defineComponent({
  props: {
    canvas: {
      type: Object as PropType<HTMLCanvasElement | null>,
      required: true,
    },
    ctx: {
      type: Object as PropType<CanvasRenderingContext2D | null>,
    },
  },
  setup(props) {
    const { canvas, ctx } = toRefs(props);
    const drawRectangle = () => {
      if (canvas.value && ctx.value) {
        ctx.value.strokeRect(150, 100, 50, -50);
      }
    };
    const drawTriangle = () => {
      if (canvas.value && ctx.value) {
        ctx.value.beginPath();
        ctx.value.moveTo(100, 100);
        ctx.value.lineTo(10, 100);
        ctx.value.lineTo(50, 50);
        ctx.value.closePath();
        ctx.value.stroke();
      }
    };
    const drawCircle = () => {
      if (canvas.value && ctx.value) {
        ctx.value.beginPath();
        ctx.value.arc(250, 80, 20, 0, Math.PI * 2, true);
        ctx.value.closePath();
        ctx.value.stroke();
      }
    };
    return { drawRectangle, drawTriangle, drawCircle };
  },
});
</script>

<style scoped></style>
