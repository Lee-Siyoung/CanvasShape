import { State } from "../utils/State";

export const mouseDown = (
  canvas: HTMLCanvasElement,
  state: State,
  event: MouseEvent
) => {
  if (canvas) {
    event.preventDefault();
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    state.mouseX = mouseX;
    state.mouseY = mouseY;
    updateShapeSelect(state, mouseX, mouseY, event.ctrlKey);

    if (state.shapes[state.ShapeIndex]) {
      checkHandleSelect(state, mouseX, mouseY);
    }
  }
};

const updateShapeSelect = (
  state: State,
  mouseX: number,
  mouseY: number,
  ctrlKey: boolean
) => {
  let index = 0;
  let isShapeClick = false;

  for (const shape of state.shapes) {
    if (shape.isPointInside(mouseX, mouseY)) {
      state.ShapeIndex = index;
      setShapeState(state);
      if (!ctrlKey) {
        shape.selectClick();
        state.isDragging = true;
        state.isResizing = false;
        isShapeClick = true;
      }
      break;
    }
    index++;
  }
  if (!ctrlKey && isShapeClick) {
    state.shapes.forEach((shape, index) => {
      if (index !== state.ShapeIndex) {
        shape.isClick = false;
      }
    });
  }
};

const checkHandleSelect = (state: State, mouseX: number, mouseY: number) => {
  for (
    let i = 0;
    i < state.shapes[state.ShapeIndex].selectionHandles.length;
    i++
  ) {
    const handle = state.shapes[state.ShapeIndex].selectionHandles[i];
    if (
      mouseX >= handle.x &&
      mouseX <= handle.x + 8 &&
      mouseY >= handle.y &&
      mouseY <= handle.y + 8
    ) {
      state.isDragging = false;
      state.isResizing = true;
      state.resizeHandleIndex = i;
      setShapeState(state);
      break;
    }
  }
};

const setShapeState = (state: State) => {
  const shape = state.shapes[state.ShapeIndex];
  state.oriX = shape.x;
  state.oriY = shape.y;
  state.oriW = shape.width;
  state.oriH = shape.height;
};
