import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";

export const keyUp = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: KeyboardEvent
) => {
  if (event.key === "Delete" && canvas && ctx) {
    const deleteShapes = state.shapes.filter((shape) => shape.isClick);
    for (const shape of deleteShapes) {
      state.history.pushHistory({ Delete: { shape } });
    }
    state.shapes = state.shapes.filter((shape) => !shape.isClick);
  } else if (event.ctrlKey && event.key === "z") {
    state.history.undo(state.shapes);
  } else if (event.ctrlKey && event.shiftKey && event.key === "Z") {
    state.history.redo(state.shapes);
  } else if (
    ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key) &&
    state.isMovingShape
  ) {
    const shape = state.shapes[state.ShapeIndex];
    if (shape) {
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
    state.isMovingShape = false;
  } else if (event.ctrlKey && event.key === "c") {
    console.log("asdas");
  } else if (event.ctrlKey && event.key === "v") {
    console.log("asdas");
  }
  drawShape(canvas, ctx, state);
};
