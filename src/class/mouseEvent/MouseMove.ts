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
      canvas.style.cursor = "grab";
    }
    if (shape.isClick) {
      for (let i = 0; i < shape.selectionHandles.length; i++) {
        const handle = shape.selectionHandles[i];
        const handleX = shape.x + shape.width / 2 - 4;
        const handleY = shape.y - 38;
        if (
          moveX >= handle.x &&
          moveX <= handle.x + 8 &&
          moveY >= handle.y &&
          moveY <= handle.y + 8
        ) {
          setCursorHandle(canvas, i);
          isCursorChange = true;
        } else if (
          moveX >= handleX &&
          moveX <= handleX + 8 &&
          moveY >= handleY &&
          moveY <= handleY + 8
        ) {
          canvas.style.cursor = "pointer";
          isCursorChange = true;
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
      canvas.style.cursor = "grabbing";
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
  } else if (state.isRotating) {
    event.preventDefault();
    if (canvas) {
      const shape = state.shapes[state.ShapeIndex];
      shape.isClick = true;
      const moveX = event.clientX - canvas.getBoundingClientRect().left;
      const moveY = event.clientY - canvas.getBoundingClientRect().top;
      const dx = moveX - shape.x - shape.width / 2;
      const dy = moveY - shape.y - shape.height / 2;
      shape.rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      drawShape(canvas, ctx, state);
      canvas.style.cursor = "pointer";
    }
  }
};
