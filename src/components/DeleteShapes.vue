<template>
  <div></div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRefs,
  onMounted,
  onBeforeUnmount,
  ref,
} from "vue";
interface Rectangle {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  click: boolean;
}
interface Triangle {
  type: "triangle";
  x: number;
  y: number;
  height: number;
  base: number;
  click: boolean;
}
interface Circle {
  type: "circle";
  x: number;
  y: number;
  radius: number;
  click: boolean;
}
type Shape = Triangle | Circle | Rectangle;
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
  emits: ["deleteShapes"],
  setup(props, { emit }) {
    const { canvas, ctx, shapes } = toRefs(props);
    const toDeletedShapes = ref<Shape[]>([]);
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        toDeletedShapes.value = shapes.value.filter((shape) => !shape.click);
        console.log(toDeletedShapes.value);
        draw_shape();
        emit("deleteShapes", toDeletedShapes.value);
      }
    };
    const draw_shape = () => {
      if (canvas.value && ctx.value) {
        ctx.value?.clearRect(0, 0, canvas.value?.width, canvas.value?.height);
        for (let shape of toDeletedShapes.value) {
          switch (shape.type) {
            case "rectangle":
              ctx.value.strokeRect(shape.x, shape.y, shape.width, shape.height);
              break;
            case "triangle":
              ctx.value.beginPath();
              ctx.value.moveTo(shape.x, shape.y - shape.height / 2);
              ctx.value.lineTo(
                shape.x - shape.base / 2,
                shape.y + shape.height / 2
              );
              ctx.value.lineTo(
                shape.x + shape.base / 2,
                shape.y + shape.height / 2
              );
              ctx.value.closePath();
              ctx.value.stroke();
              break;
            case "circle":
              ctx.value.beginPath();
              ctx.value.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
              ctx.value.stroke();
              break;
          }
        }
      }
    };

    onMounted(() => {
      window.addEventListener("keyup", onKeyUp);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keyup", onKeyUp);
    });

    return { onKeyUp, draw_shape };
  },
});
</script>

<style scoped></style>
