import { MouseEventClass, State } from "./mouseEvent";
export const click = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent,
  mouseEvent: MouseEventClass
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
    mouseEvent.drawShape(canvas, ctx);
  }
};
