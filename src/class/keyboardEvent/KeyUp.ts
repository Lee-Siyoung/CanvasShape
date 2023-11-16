import { State } from "../utils/State";
import { drawShape } from "../utils/drawShape";

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
    drawShape(canvas, ctx, state);
  } else if (event.ctrlKey && event.key === "z") {
    state.history.undo(state.shapes);
    if (canvas && ctx) drawShape(canvas, ctx, state);
  } else if (event.ctrlKey && event.shiftKey && event.key === "Z") {
    state.history.redo(state.shapes);
    if (canvas && ctx) drawShape(canvas, ctx, state);
  }
};
