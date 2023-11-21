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
            shape.width += oldX - moveX;
            shape.height += oldY - moveY;
            shape.x = moveX;
            shape.y = moveY;
            break;
          case 1:
            shape.height += oldY - moveY;
            shape.y = moveY;
            break;
          case 2:
            shape.width = moveX - oldX;
            shape.height += oldY - moveY;
            shape.y = moveY;
            break;
          case 3:
            shape.width += oldX - moveX;
            shape.x = moveX;
            break;
          case 4:
            shape.width = moveX - oldX;
            break;
          case 5:
            shape.width += oldX - moveX;
            shape.height = moveY - oldY;
            shape.x = moveX;
            break;
          case 6:
            shape.height = moveY - oldY;
            break;
          case 7:
            shape.width = moveX - oldX;
            shape.height = moveY - oldY;
            break;
        }
      } else if (shape instanceof Circle) {
        let oppositeX, oppositeY;
        switch (state.resizeHandleIndex) {
          case 0:
            oppositeX = shape.x + 2 * shape.radius;
            oppositeY = shape.y + 2 * shape.radius;
            shape.radius = Math.abs(moveX - oppositeX) / 2;
            shape.x = oppositeX - 2 * shape.radius;
            shape.y = oppositeY - 2 * shape.radius;
            break;
          case 1:
            oppositeX = shape.x;
            oppositeY = shape.y + 2 * shape.radius;
            shape.radius = Math.abs(moveX - oppositeX) / 2;
            shape.y = oppositeY - 2 * shape.radius;
            break;
          case 2:
            oppositeX = shape.x + 2 * shape.radius;
            oppositeY = shape.y;
            shape.radius = Math.abs(moveY - oppositeY) / 2;
            shape.x = oppositeX - 2 * shape.radius;
            break;
          case 3:
            oppositeX = shape.x;
            oppositeY = shape.y;
            shape.radius = Math.max(
              Math.abs(moveX - oppositeX) / 2,
              Math.abs(moveY - oppositeY) / 2
            );
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
