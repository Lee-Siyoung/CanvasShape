import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";

export const keyDown = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: KeyboardEvent
) => {
  const shape = state.shapes[state.ShapeIndex];
  if (!shape) return;

  if (!state.isMovingShape) {
    state.isMovingShape = true;
    state.oriX = shape.x;
    state.oriY = shape.y;
  }
  if (event.key === "ArrowDown") {
    shape.y += 10;
  } else if (event.key === "ArrowUp") {
    shape.y -= 10;
  } else if (event.key === "ArrowLeft") {
    shape.x -= 10;
  } else if (event.key === "ArrowRight") {
    shape.x += 10;
  }
  drawShape(canvas, ctx, state);
};
