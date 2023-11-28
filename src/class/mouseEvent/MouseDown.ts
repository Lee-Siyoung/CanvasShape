import { RotatePoint } from "../utils/RotatePoint";
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
      checkSelectHandle(state, state.mouseX, state.mouseY);
      checkRotateHandle(state, state.mouseX, state.mouseY);
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

const checkSelectHandle = (state: State, mouseX: number, mouseY: number) => {
  const shape = state.shapes[state.ShapeIndex];
  const centerX = shape.x + shape.width / 2;
  const centerY = shape.y + shape.height / 2;
  const rotatedMousePos = RotatePoint(
    mouseX,
    mouseY,
    centerX,
    centerY,
    shape.rotation
  );

  for (let i = 0; i < shape.selectionHandles.length; i++) {
    const handle = shape.selectionHandles[i];
    if (
      rotatedMousePos.x >= handle.x &&
      rotatedMousePos.x <= handle.x + 8 &&
      rotatedMousePos.y >= handle.y &&
      rotatedMousePos.y <= handle.y + 8
    ) {
      state.isDragging = false;
      state.isResizing = true;
      state.resizeHandleIndex = i;
      setShapeState(state);
      break;
    }
  }
};
const checkRotateHandle = (state: State, mouseX: number, mouseY: number) => {
  if (state.shapes[state.ShapeIndex]) {
    const shape = state.shapes[state.ShapeIndex];
    const centerX = shape.x + shape.width / 2;
    const centerY = shape.y + shape.height / 2;
    const rotatedMousePos = RotatePoint(
      mouseX,
      mouseY,
      centerX,
      centerY,
      shape.rotation
    );
    const handleX = shape.x + shape.width / 2 - 4;
    const handleY = shape.y - 38;
    if (
      rotatedMousePos.x >= handleX &&
      rotatedMousePos.x <= handleX + 8 &&
      rotatedMousePos.y >= handleY &&
      rotatedMousePos.y <= handleY + 8
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
