import { Circle } from "../shape/Circle";
import { State } from "../utils/State";

export const resizeRectangle = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
  state: State,
  shape: Circle
) => {
  const moveX = event.clientX - canvas.getBoundingClientRect().left;
  const moveY = event.clientY - canvas.getBoundingClientRect().top;
  let oppositeX, oppositeY;
  switch (state.resizeHandleIndex) {
    case 0:
      oppositeX = shape.x + shape.width;
      oppositeY = shape.y + shape.width;
      shape.width = Math.abs(moveX - oppositeX);
      shape.x = oppositeX - shape.width;
      shape.y = oppositeY - shape.width;
      break;
    case 2:
      oppositeX = shape.x;
      oppositeY = shape.y + shape.width;
      shape.width = Math.abs(moveX - shape.x);
      shape.y = oppositeY - shape.width;
      break;
    case 5:
      oppositeX = shape.x + shape.width;
      oppositeY = shape.y;
      shape.width = Math.abs(moveY - oppositeY);
      shape.x = oppositeX - shape.width;
      break;
    case 7:
      oppositeX = shape.x;
      oppositeY = shape.y;
      shape.width = Math.max(
        Math.abs(moveX - oppositeX),
        Math.abs(moveY - oppositeY)
      );
      break;
  }
};
