import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";
import { Rectangle } from "../shape/Rectangle";
import { Triangle } from "../shape/Triangle";
import { Circle } from "../shape/Circle";
import { Text } from "../shape/Text";
import { setCursorHandle } from "../utils/CursorHandle";
import { resizeRectangle } from "../resize/ResizeRectangle";
import { resizeTriangle } from "../resize/ResizeTriangle";
import { resizeCircle } from "../resize/ResizeCircle";
import { resizeText } from "../resize/ResizeText";
export const mouseMove = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: MouseEvent
) => {
  const moveX = event.clientX - canvas.getBoundingClientRect().left;
  const moveY = event.clientY - canvas.getBoundingClientRect().top;
  let isCursorChange = false;
  for (const shape of state.shapes) {
    if (shape.isPointInside(moveX, moveY)) {
      isCursorChange = true;
      canvas.style.cursor = "pointer";
    }

    if (shape.isClick) {
      for (let i = 0; i < shape.selectionHandles.length; i++) {
        const handle = shape.selectionHandles[i];
        if (
          moveX >= handle.x &&
          moveX <= handle.x + 8 &&
          moveY >= handle.y &&
          moveY <= handle.y + 8
        ) {
          setCursorHandle(canvas, i);
          isCursorChange = true;
          break;
        }
      }
      if (isCursorChange) break;
    }
  }
  if (!isCursorChange) {
    canvas.style.cursor = "default";
  }
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
      canvas.style.cursor = "move";
    }
  } else if (state.isResizing) {
    event.preventDefault();
    if (canvas) {
      const shape = state.shapes[state.ShapeIndex];
      shape.isClick = true;
      if (shape instanceof Rectangle) {
        resizeRectangle(canvas, event, state, shape);
      } else if (shape instanceof Triangle) {
        resizeTriangle(canvas, event, state, shape);
      } else if (shape instanceof Circle) {
        resizeCircle(canvas, event, state, shape);
      } else if (shape instanceof Text) {
        resizeText(canvas, event, state, shape);
      }
      setCursorHandle(canvas, state.resizeHandleIndex);
      drawShape(canvas, ctx, state);
    }
  }
};
