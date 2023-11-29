import { State } from "../utils/State";
import { rotatePoint } from "../rotate/rotatePoint";

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
  const shape = state.shapes[state.ShapeIndex];
  const rotation = shape.rotation;
  const centerX = shape.x + shape.width / 2;
  const centerY = shape.y + shape.height / 2;

  for (let i = 0; i < shape.selectionHandles.length; i++) {
    const handle = shape.selectionHandles[i];
    const rotatedHandle = rotatePoint(
      { x: handle.x, y: handle.y },
      centerX,
      centerY,
      rotation
    );

    if (
      state.mouseX >= rotatedHandle.x &&
      state.mouseX <= rotatedHandle.x + 8 &&
      state.mouseY >= rotatedHandle.y &&
      state.mouseY <= rotatedHandle.y + 8
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
    const centerX = shape.x + shape.width / 2;
    const centerY = shape.y + shape.height / 2;
    const handleX = centerX - 4;
    const handleY = shape.y - 38;
    const rotatedHandle = rotatePoint(
      { x: handleX, y: handleY },
      centerX,
      centerY,
      shape.rotation
    );
    if (
      state.mouseX >= rotatedHandle.x &&
      state.mouseX <= rotatedHandle.x + 8 &&
      state.mouseY >= rotatedHandle.y &&
      state.mouseY <= rotatedHandle.y + 8
    ) {
      state.isDragging = false;
      state.isRotating = true;
      state.oriRotation = shape.rotation;
    }
  }
};

const setShapeState = (state: State) => {
  const shape = state.shapes[state.ShapeIndex];
  state.oriX = shape.x;
  state.oriY = shape.y;
  state.oriW = shape.width;
  state.oriH = shape.height;
  state.oriRotation = shape.rotation;
};
