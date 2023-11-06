<template>
  <div>
    <button @click="drawRectangle">사각형</button>
    <button @click="drawTriangle">삼각형</button>
    <button @click="drawCircle">원</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { Rectangle, Triangle, Circle } from "../class/shape";

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
        const rectangle = new Rectangle(
          canvas.value.width / 2,
          canvas.value.height / 4,
          80,
          60,
          false
        );
        rectangle.draw(ctx.value);
        console.log(rectangle);
        emit("addShape", rectangle);
      }
    };
    const drawTriangle = () => {
      if (canvas.value && ctx.value) {
        const triangle = new Triangle(
          canvas.value.width / 5,
          canvas.value.height / 2,
          80,
          60,
          false
        );
        triangle.draw(ctx.value);
        console.log(triangle);
        emit("addShape", triangle);
      }
    };
    const drawCircle = () => {
      if (canvas.value && ctx.value) {
        const circle = new Circle(
          canvas.value.width / 1.2,
          canvas.value.height / 2,
          40,
          false
        );
        circle.draw(ctx.value);
        console.log(circle);
        emit("addShape", circle);
      }
    };
    return { drawRectangle, drawTriangle, drawCircle };
  },
});
</script>

<style scoped></style>
