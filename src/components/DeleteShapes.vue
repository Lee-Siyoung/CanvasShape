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
  reactive,
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
  emits: ["deleteShapes"],
  setup(props, { emit }) {
    const { canvas, ctx, shapes } = toRefs(props);
    const toDeletedShapes = ref<Shape[]>([]);
    const state = reactive({ clickColor: "red", notClickColor: "black" });
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        toDeletedShapes.value = shapes.value.filter((shape) => !shape.click);
        draw_shape();
        emit("deleteShapes", toDeletedShapes.value);
      }
    };
    const draw_shape = () => {
      if (canvas.value && ctx.value) {
        ctx.value?.clearRect(0, 0, canvas.value?.width, canvas.value?.height);
        for (let shape of toDeletedShapes.value) {
          if (shape.click) {
            ctx.value.strokeStyle = state.clickColor;
          } else {
            ctx.value.strokeStyle = state.notClickColor;
          }
          shape.draw(ctx.value);
        }
      }
    };

    onMounted(() => {
      window.addEventListener("keyup", onKeyUp);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keyup", onKeyUp);
    });

    return { state, onKeyUp, draw_shape };
  },
});
</script>

<style scoped></style>
