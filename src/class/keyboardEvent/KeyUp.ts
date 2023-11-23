import { State } from "../utils/State";
import { drawShape } from "../utils/DrawShape";

export const keyUp = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  event: KeyboardEvent
) => {
  const clickShapes = state.shapes.filter((shape) => shape.isClick);
  if (event.key === "Delete" && canvas && ctx) {
    for (const shape of clickShapes) {
      state.history.pushHistory({ Delete: { shape } });
    }
    state.shapes = state.shapes.filter((shape) => !shape.isClick);
  } else if (event.ctrlKey && event.key === "z") {
    state.history.undo(state.shapes);
  } else if (event.ctrlKey && event.shiftKey && event.key === "Z") {
    state.history.redo(state.shapes);
  } else if (
    ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key) &&
    state.isMovingArrow
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
    state.isMovingArrow = false;
  } else if (event.ctrlKey && event.key === "c") {
    const selectedShape = state.shapes.find((shape) => shape.isClick);
    state.copyShape = selectedShape ? selectedShape.clone() : null;
  } else if (event.ctrlKey && event.key === "v") {
    if (state.copyShape) {
      const newShape = state.copyShape.clone();
      newShape.id = state.shapeId++;
      state.shapes.push(newShape);
      state.history.pushHistory({ Create: { shape: newShape } });
    }
  }
  drawShape(canvas, ctx, state);
};
