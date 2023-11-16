import { MouseEventClass, State } from "./mouseEvent";

export const mouseMove = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent,
  mouseEvent: MouseEventClass
) => {
  if (!state.isDragging) return;
  else {
    event.preventDefault();
    if (canvas) {
      const moveX = event.clientX - canvas.getBoundingClientRect().left;
      const moveY = event.clientY - canvas.getBoundingClientRect().top;
      state.shapes[state.ShapeIndex].x += moveX - state.mouseX;
      state.shapes[state.ShapeIndex].y += moveY - state.mouseY;
      mouseEvent.drawShape(canvas, ctx);
      state.mouseX = moveX;
      state.mouseY = moveY;
    }
  }
};
