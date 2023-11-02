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
  emits: ["addShape"],
  setup(props, { emit }) {
    const { canvas, ctx } = toRefs(props);
    const drawRectangle = () => {
      if (canvas.value && ctx.value) {
        const x = canvas.value.width / 2;
        const y = canvas.value.height / 4;
        const width = 80;
        const height = 60;
        ctx.value.strokeRect(x, y, width, height);
        const shape = {
          type: "rectangle",
          x,
          y,
          width,
          height,
        };
        emit("addShape", shape);
      }
    };
    const drawTriangle = () => {
      if (canvas.value && ctx.value) {
        const x = canvas.value.width / 5;
        const y = canvas.value.height / 2;
        const height = 60;
        const base = 80;

        ctx.value.beginPath();
        ctx.value.moveTo(x, y - height / 2);
        ctx.value.lineTo(x - base / 2, y + height / 2);
        ctx.value.lineTo(x + base / 2, y + height / 2);
        ctx.value.closePath();
        ctx.value.stroke();
        const shape = {
          type: "triangle",
          x,
          y,
          height,
          base,
        };
        emit("addShape", shape);
      }
    };
    const drawCircle = () => {
      if (canvas.value && ctx.value) {
        const x = canvas.value.width / 1.2;
        const y = canvas.value.height / 2;
        const radius = 40;

        ctx.value.beginPath();
        ctx.value.arc(x, y, radius, 0, Math.PI * 2);
        ctx.value.stroke();
        const shape = {
          type: "circle",
          x,
          y,
          radius,
        };
        emit("addShape", shape);
      }
    };
    return { drawRectangle, drawTriangle, drawCircle };
  },
});
</script>

<style scoped></style>
