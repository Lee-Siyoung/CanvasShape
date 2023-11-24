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
      checkSelectHandle(state);
      checkRotateHandle(state);
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

const checkSelectHandle = (state: State) => {
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
      state.isResizing = true;
      state.resizeHandleIndex = i;
      setShapeState(state);
      break;
    }
  }
};
const checkRotateHandle = (state: State) => {
  if (state.shapes[state.ShapeIndex]) {
    const shape = state.shapes[state.ShapeIndex];
    const handleX = shape.x + shape.width / 2 - 4;
    const handleY = shape.y - 38;
    if (
      state.mouseX >= handleX &&
      state.mouseX <= handleX + 8 &&
      state.mouseY >= handleY &&
      state.mouseY <= handleY + 8
    ) {
      state.isDragging = false;
      state.isRotating = true;
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
