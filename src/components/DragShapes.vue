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
    const state = reactive({
      startX: 0,
      startY: 0,
      currentShapeIndex: 0,
      isDragging: false,
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
        event.preventDefault();
        state.startX =
          event.clientX - canvas.value?.getBoundingClientRect().left;
        state.startY =
          event.clientY - canvas.value?.getBoundingClientRect().top;
        let index = 0;
        for (let shape of shapes.value) {
          if (isPointShape(state.startX, state.startY, shape)) {
            state.currentShapeIndex = index;
            state.isDragging = true;
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
    };
    const onMouseOut = (event: MouseEvent) => {
      if (!state.isDragging) {
        return;
      }
      event.preventDefault();
      state.isDragging = false;
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
          const currentShape = shapes.value[state.currentShapeIndex];
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
      canvas.value?.addEventListener("mousedown", onMouseDown);
      canvas.value?.addEventListener("mouseup", onMouseUp);
      canvas.value?.addEventListener("mouseout", onMouseOut);
      canvas.value?.addEventListener("mousemove", onMouseMove);
    });
    return {
      state,
      isPointShape,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onMouseMove,
    };
  },
});
</script>

<style scoped></style>
