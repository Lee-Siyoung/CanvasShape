import { State } from "../utils/State";

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
          state.isResizing = false;
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
          state.isResizing = false;
          shape.selectClick();
        } else {
          shape.isClick = false;
        }
        index++;
      }
    }
    let handleIndex = -1;
    if (state.shapes[state.ShapeIndex]) {
      for (
        let i = 0;
        i < state.shapes[state.ShapeIndex].selectionHandles.length;
        i++
      ) {
        const handle = state.shapes[state.ShapeIndex].selectionHandles[i];
        if (
          state.mouseX >= handle.x &&
          state.mouseX <= handle.x + 8 &&
          state.mouseY >= handle.y &&
          state.mouseY <= handle.y + 8
        ) {
          state.isDragging = false;
          handleIndex = i;
          state.isResizing = true;
          state.resizeHandleIndex = handleIndex;
          state.resizeX = state.mouseX;
          state.resizeY = state.mouseY;
          console.log(handle, state.resizeHandleIndex);
          break;
        }
      }
    }
    console.log(state.isResizing);
  }
};
