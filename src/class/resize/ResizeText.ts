import { Text } from "../shape/Text";
import { State } from "../utils/State";

export const resizeRectangle = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
  state: State,
  shape: Text
) => {
  const moveX = event.clientX - canvas.getBoundingClientRect().left;
  const moveY = event.clientY - canvas.getBoundingClientRect().top;
  //const oldX = shape.x;
  //const oldY = shape.y;

  switch (state.resizeHandleIndex) {
    case 0:
      shape.fontSize = Math.max(10, moveY - shape.y);
      shape.x = moveX;
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  }
};
