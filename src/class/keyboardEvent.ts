import { drawShape } from "./utils/drawShape";
import { State } from "./utils/State";

export class keyboardEventClass {
  state: State;
  constructor(state: State) {
    this.state = state;
  }
  onKeyUp(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    event: KeyboardEvent
  ): void {
    if (event.key === "Delete" && canvas && ctx) {
      const deleteShapes = this.state.shapes.filter((shape) => shape.isClick);
      for (const shape of deleteShapes) {
        this.state.history.pushHistory({ Delete: { shape } });
      }
      this.state.shapes = this.state.shapes.filter((shape) => !shape.isClick);
      drawShape(canvas, ctx, this.state);
    } else if (event.ctrlKey && event.key === "z") {
      this.state.history.undo(this.state.shapes);
      if (canvas && ctx) drawShape(canvas, ctx, this.state);
    } else if (event.ctrlKey && event.shiftKey && event.key === "Z") {
      this.state.history.redo(this.state.shapes);
      if (canvas && ctx) drawShape(canvas, ctx, this.state);
    }
  }
}
