import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";

export const mouseMove = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent
) => {
  if (!state.isDragging) return;
  else {
    event.preventDefault();
    if (canvas) {
      const moveX = event.clientX - canvas.getBoundingClientRect().left;
      const moveY = event.clientY - canvas.getBoundingClientRect().top;
      state.shapes[state.ShapeIndex].x += moveX - state.mouseX;
      state.shapes[state.ShapeIndex].y += moveY - state.mouseY;
      drawShape(canvas, ctx, state);
      state.mouseX = moveX;
      state.mouseY = moveY;
    }
  }
};
