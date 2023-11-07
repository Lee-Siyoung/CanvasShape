<template>
  <div>
    <button @click="drawRectangle">사각형</button>
    <button @click="drawTriangle">삼각형</button>
    <button @click="drawCircle">원</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { Rectangle, Triangle, Circle } from "../class/extendsShape";

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
        const width = Math.random() * 100 + 30;
        const height = Math.random() * 100 + 30;
        const rectangle = new Rectangle(
          Math.random() * (canvas.value.width - width),
          Math.random() * (canvas.value.height - height),
          false,
          width,
          height
        );
        rectangle.draw(ctx.value);
        emit("addShape", rectangle);
      }
    };
    const drawTriangle = () => {
      if (canvas.value && ctx.value) {
        const width = Math.random() * 100 + 30;
        const height = Math.random() * 100 + 30;
        const triangle = new Triangle(
          Math.random() * (canvas.value.width - width),
          Math.random() * (canvas.value.height - height),
          false,
          width,
          height
        );
        triangle.draw(ctx.value);
        emit("addShape", triangle);
      }
    };
    const drawCircle = () => {
      if (canvas.value && ctx.value) {
        const radius = Math.random() * 100 + 30;
        const circle = new Circle(
          Math.random() * (canvas.value.width - radius * 2),
          Math.random() * (canvas.value.height - radius),
          false,
          radius
        );
        circle.draw(ctx.value);
        emit("addShape", circle);
      }
    };
    return { drawRectangle, drawTriangle, drawCircle };
  },
});
</script>

<style scoped></style>
