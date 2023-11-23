import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";

export const keyDown = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: KeyboardEvent
) => {
  if (event.key === "ArrowDown" && canvas && ctx) {
    const shape = state.shapes[state.ShapeIndex];
    shape.y += 10;
    drawShape(canvas, ctx, state);
  } else if (event.key === "ArrowUp" && canvas && ctx) {
    const shape = state.shapes[state.ShapeIndex];
    shape.y -= 10;
    drawShape(canvas, ctx, state);
  } else if (event.key === "ArrowLeft" && canvas && ctx) {
    const shape = state.shapes[state.ShapeIndex];
    shape.x -= 10;
    drawShape(canvas, ctx, state);
  } else if (event.key === "ArrowRight" && canvas && ctx) {
    const shape = state.shapes[state.ShapeIndex];
    shape.x += 10;
    drawShape(canvas, ctx, state);
  }
};
