import { State } from "./mouseEvent";

export const mouseDown = (
  canvas: HTMLCanvasElement,
  state: State,
  event: MouseEvent
) => {
  if (canvas) {
    event.preventDefault();
    state.mouseX = event.clientX - canvas.getBoundingClientRect().left;
    state.mouseY = event.clientY - canvas.getBoundingClientRect().top;
    let index = 0;
    if (event.ctrlKey) {
      for (const shape of state.shapes) {
        if (shape.isPointInside(state.mouseX, state.mouseY)) {
          state.ShapeIndex = index;
          state.oriX = state.shapes[state.ShapeIndex].x;
          state.oriY = state.shapes[state.ShapeIndex].y;
          state.isDragging = true;
          shape.selectClick();
        }
        index++;
      }
    } else {
      for (const shape of state.shapes) {
        if (shape.isPointInside(state.mouseX, state.mouseY)) {
          state.ShapeIndex = index;
          state.oriX = state.shapes[state.ShapeIndex].x;
          state.oriY = state.shapes[state.ShapeIndex].y;
          state.isDragging = true;
          shape.selectClick();
        } else {
          shape.isClick = false;
        }
        index++;
      }
    }
  }
};
