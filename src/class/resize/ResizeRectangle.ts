import { Rectangle } from "../shape/Rectangle";
import { State } from "../utils/State";

export const resizeRectangle = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
  state: State,
  shape: Rectangle
) => {
  const moveX = event.clientX - canvas.getBoundingClientRect().left;
  const moveY = event.clientY - canvas.getBoundingClientRect().top;
  const oldX = shape.x;
  const oldY = shape.y;
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
};
