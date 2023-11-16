import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";
export const click = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent
) => {
  if (canvas) {
    event.preventDefault();
    if (event.ctrlKey) {
      for (const shape of state.shapes) {
        if (shape.isPointInside(state.mouseX, state.mouseY)) {
          shape.selectClick();
        }
      }
    } else {
      for (const shape of state.shapes) {
        if (shape.isPointInside(state.mouseX, state.mouseY)) {
          shape.selectClick();
        } else {
          shape.isClick = false;
        }
      }
    }
    drawShape(canvas, ctx, state);
  }
};
