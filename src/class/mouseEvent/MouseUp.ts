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

  const shape = state.shapes[state.ShapeIndex];
  shape.isClick = true;
  if (state.isDragging) {
    event.preventDefault();
    if (state.oriX !== shape.x && state.oriY !== shape.y) {
      state.history.pushHistory({
        Move: {
          shapeId: shape.id,
          oldX: state.oriX,
          oldY: state.oriY,
          newX: shape.x,
          newY: shape.y,
        },
      });
    }
    state.isDragging = false;
  } else if (state.isResizing) {
    event.preventDefault();
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
    state.history.pushHistory({
      Resize: {
        shapeId: shape.id,
        oldX: state.oriX,
        oldY: state.oriY,
        newX: shape.x,
        newY: shape.y,
        oldW: state.oriW,
        oldH: state.oriH,
        newW: shape.width,
        newH: shape.height,
      },
    });
    shape.isClick = true;
    state.isResizing = false;
    state.resizeHandleIndex = -1;
  }
  for (const shape of state.shapes) {
    if (shape.isPointInside(state.mouseX, state.mouseY)) {
      shape.selectClick();
    }
  }
  drawShape(canvas, ctx, state);
};
