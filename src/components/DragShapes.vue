<template>
  <div></div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
  ref,
  onUpdated,
  onMounted,
} from "vue";
interface Rectangle {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Triangle {
  type: "triangle";
  x: number;
  y: number;
  height: number;
  base: number;
}
interface Circle {
  type: "circle";
  x: number;
  y: number;
  radius: number;
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
  setup(props) {
    const { canvas, ctx, shapes } = toRefs(props);
    const currentShape = ref<Shape | null>(null);
    const state = reactive({
      offsetX: 0,
      offsetY: 0,
    });
    const isPointShape = (x: number, y: number, shape: Shape) => {
      switch (shape.type) {
        case "rectangle": {
          const shape_left = shape.x;
          const shape_right = shape.x + shape.width;
          const shape_top = shape.y;
          const shape_bottom = shape.y + shape.height;
          if (
            x > shape_left &&
            x < shape_right &&
            y > shape_top &&
            y < shape_bottom
          ) {
            return true;
          } else {
            return false;
          }
        }
        case "triangle": {
          const A = { x: shape.x, y: shape.y - shape.height / 2 };
          const B = {
            x: shape.x - shape.base / 2,
            y: shape.y + shape.height / 2,
          };
          const C = {
            x: shape.x + shape.base / 2,
            y: shape.y + shape.height / 2,
          };

          const areaOrig = Math.abs(
            (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2.0
          );

          const area1 = Math.abs(
            (x * (B.y - C.y) + B.x * (C.y - y) + C.x * (y - B.y)) / 2.0
          );
          const area2 = Math.abs(
            (A.x * (y - C.y) + x * (C.y - A.y) + C.x * (A.y - y)) / 2.0
          );
          const area3 = Math.abs(
            (A.x * (B.y - y) + B.x * (y - A.y) + x * (A.y - B.y)) / 2.0
          );
          if (areaOrig == area1 + area2 + area3) return true;
          else return false;
        }
        case "circle": {
          const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
          return distance <= shape.radius;
        }
      }
    };
    const onMouseDown = (event: MouseEvent) => {
      if (canvas.value) {
        const mouseX =
          event.clientX - canvas.value?.getBoundingClientRect().left;
        const mouseY =
          event.clientY - canvas.value?.getBoundingClientRect().top;
        for (let shape of shapes.value) {
          if (isPointShape(mouseX, mouseY, shape)) {
            state.offsetX = mouseX - shape.x;
            state.offsetY = mouseY - shape.y;
            console.log(state.offsetX, state.offsetY);
            break;
          }
        }
      }
    };
    onMounted(() => {
      canvas.value?.addEventListener("mousedown", onMouseDown);
    });
    return { state, isPointShape, onMouseDown };
  },
});
</script>

<style scoped></style>
