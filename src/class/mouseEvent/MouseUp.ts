import { State } from "../utils/State";

export const mouseUp = (state: State, event: MouseEvent) => {
  if (!state.isDragging && !state.isResizing) {
    return;
  }

  const moveShape = state.shapes[state.ShapeIndex];
  moveShape.isClick = true;
  if (state.isDragging) {
    event.preventDefault();
    if (state.oriX !== moveShape.x && state.oriY !== moveShape.y) {
      state.history.pushHistory({
        Move: {
          shapeId: moveShape.id,
          oldX: state.oriX,
          oldY: state.oriY,
          newX: moveShape.x,
          newY: moveShape.y,
        },
      });
    }
    state.isDragging = false;
    for (const shape of state.shapes) {
      if (shape.isPointInside(state.mouseX, state.mouseY)) {
        shape.selectClick();
      }
    }
  } else if (state.isResizing) {
    moveShape.isClick = true;
    state.isResizing = false;
    state.resizeHandleIndex = -1;
  }
};
