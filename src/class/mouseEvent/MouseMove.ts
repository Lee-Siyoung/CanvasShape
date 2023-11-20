import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";
import { Rectangle } from "../shape/Rectangle";

export const mouseMove = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent
) => {
  if (state.isDragging) {
    event.preventDefault();
    if (canvas) {
      const shape = state.shapes[state.ShapeIndex];
      shape.isClick = true;
      const moveX = event.clientX - canvas.getBoundingClientRect().left;
      const moveY = event.clientY - canvas.getBoundingClientRect().top;
      shape.x += moveX - state.mouseX;
      shape.y += moveY - state.mouseY;
      drawShape(canvas, ctx, state);
      state.mouseX = moveX;
      state.mouseY = moveY;
    }
  } else if (state.isResizing) {
    event.preventDefault();
    if (canvas) {
      const shape = state.shapes[state.ShapeIndex];
      const moveX = event.clientX - canvas.getBoundingClientRect().left;
      const moveY = event.clientY - canvas.getBoundingClientRect().top;
      const oldX = shape.x;
      const oldY = shape.y;
      if (shape instanceof Rectangle) {
        shape.isClick = true;
        switch (state.resizeHandleIndex) {
          case 0:
            shape.x = moveX;
            shape.y = moveY;
            shape.width += oldX - moveX;
            shape.height += oldY - moveY;
            drawShape(canvas, ctx, state);
            break;
          case 1:
            shape.y = moveY;
            shape.height += oldY - moveY;
            drawShape(canvas, ctx, state);
            break;
          case 2:
            shape.y = moveY;
            shape.width = moveX - oldX;
            shape.height += oldY - moveY;
            drawShape(canvas, ctx, state);
            break;
          case 3:
            shape.x = moveX;
            shape.width += oldX - moveX;
            drawShape(canvas, ctx, state);
            break;
          case 4:
            shape.width = moveX - oldX;
            drawShape(canvas, ctx, state);
            break;
          case 5:
            shape.x = moveX;
            shape.width += oldX - moveX;
            shape.height = moveY - oldY;
            drawShape(canvas, ctx, state);
            break;
          case 6:
            shape.height = moveY - oldY;
            drawShape(canvas, ctx, state);
            break;
          case 7:
            shape.width = moveX - oldX;
            shape.height = moveY - oldY;
            drawShape(canvas, ctx, state);
            break;
        }
      }
    }
  }
};
