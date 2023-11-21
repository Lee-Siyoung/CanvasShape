import { Rectangle } from "../shape/Rectangle";
import { drawShape } from "../utils/DrawShape";
import { State } from "../utils/State";

export const mouseUp = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent
) => {
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
    for (const shape of state.shapes) {
      if (shape instanceof Rectangle) {
        if (shape.width < 0) {
          shape.width = Math.abs(shape.width);
          shape.x = shape.x - shape.width;
        }
        if (shape.height < 0) {
          shape.height = Math.abs(shape.height);
          shape.y = shape.y - shape.height;
        }
      }
    }
    drawShape(canvas, ctx, state);
    moveShape.isClick = true;
    state.isResizing = false;
    state.resizeHandleIndex = -1;
  }
};
