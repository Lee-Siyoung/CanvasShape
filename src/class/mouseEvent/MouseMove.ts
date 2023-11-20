import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";
import { Rectangle } from "../shape/Rectangle";
import { Triangle } from "../shape/Triangle";
import { Circle } from "../shape/Circle";

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
      shape.isClick = true;
      if (shape instanceof Rectangle) {
        switch (state.resizeHandleIndex) {
          case 0:
            shape.x = moveX;
            shape.y = moveY;
            shape.width += oldX - moveX;
            shape.height += oldY - moveY;
            break;
          case 1:
            shape.y = moveY;
            shape.height += oldY - moveY;
            break;
          case 2:
            shape.y = moveY;
            shape.width = moveX - oldX;
            shape.height += oldY - moveY;
            break;
          case 3:
            shape.x = moveX;
            shape.width += oldX - moveX;
            break;
          case 4:
            shape.width = moveX - oldX;
            break;
          case 5:
            shape.x = moveX;
            shape.width += oldX - moveX;
            shape.height = moveY - oldY;
            break;
          case 6:
            shape.height = moveY - oldY;
            break;
          case 7:
            shape.width = moveX - oldX;
            shape.height = moveY - oldY;
            break;
        }
      } else if (shape instanceof Triangle) {
        switch (state.resizeHandleIndex) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
        }
      } else if (shape instanceof Circle) {
        const dx = moveX - shape.x;
        const dy = moveY - shape.y;
        const newRadius = Math.sqrt(dx * dx + dy * dy);

        switch (state.resizeHandleIndex) {
          case 0:
            shape.radius = newRadius;
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            shape.radius = newRadius;
            break;
        }
      } else if (shape instanceof Text) {
        switch (state.resizeHandleIndex) {
          case 0:
            break;
        }
      }

      drawShape(canvas, ctx, state);
    }
  }
};
