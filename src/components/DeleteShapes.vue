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

    const onDoubleClick = () => {
      for (let shape of shapes.value) {
        //if (isPointShape(state.startX, state.startY, shape) && ctx.value) {
        if (shape.click) {
          console.log("클릭해제");
          shape.click = false;
        } else {
          console.log("클릭");
          shape.click = true;
        }
        return;
      }
    };
    //};
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        const toDeleteShapes = shapes.value.filter((shape) => shape.click);
        emit("deleteShapes", toDeleteShapes);
        //draw_shape();
      }
    };

    onMounted(() => {
      canvas.value?.addEventListener("dblclick", onDoubleClick);
      window.addEventListener("keyup", onKeyUp);
    });
    onBeforeUnmount(() => {
      canvas.value?.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("keyup", onKeyUp);
    });

    return {};
  },
});
</script>

<style scoped></style>
