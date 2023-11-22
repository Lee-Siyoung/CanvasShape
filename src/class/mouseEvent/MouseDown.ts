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

    updateMousePosition(state, mouseX, mouseY);
    updateShapeSelection(state, mouseX, mouseY, event.ctrlKey);

    if (state.shapes[state.ShapeIndex]) {
      checkHandle(state, mouseX, mouseY);
    }
  }
};

const updateMousePosition = (state: State, mouseX: number, mouseY: number) => {
  state.mouseX = mouseX;
  state.mouseY = mouseY;
};

const updateShapeSelection = (
  state: State,
  mouseX: number,
  mouseY: number,
  ctrlKey: boolean
) => {
  let index = 0;
  for (const shape of state.shapes) {
    if (shape.isPointInside(mouseX, mouseY)) {
      state.ShapeIndex = index;
      setShapeState(state);
      if (!ctrlKey) {
        shape.selectClick();
        state.isDragging = true;
        state.isResizing = false;
      }
      break;
    } else if (!ctrlKey) {
      shape.isClick = false;
    }
    index++;
  }
};

const checkHandle = (state: State, mouseX: number, mouseY: number) => {
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
