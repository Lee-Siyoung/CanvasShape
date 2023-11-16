import { Shape } from "./shape/shape";
import { History } from "./history/history";
import { MouseEventClass } from "./mouseEvent";

export interface State {
  shapes: Shape[];
  mouseX: number;
  mouseY: number;
  oriX: number;
  oriY: number;
  ShapeIndex: number;
  isDragging: boolean;
  clickColor: string;
  notClickColor: string;
  history: History;
}
export class keyboardEventClass {
  state: State;
  constructor(state: State) {
    this.state = state;
  }
  onKeyUp(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    event: KeyboardEvent,
    mouseEvent: MouseEventClass
  ): void {
    if (event.key === "Delete" && canvas && ctx) {
      const deleteShapes = this.state.shapes.filter((shape) => shape.isClick);
      for (const shape of deleteShapes) {
        this.state.history.pushHistory({ Delete: { shape } });
      }
      this.state.shapes = this.state.shapes.filter((shape) => !shape.isClick);
      mouseEvent.drawShape(canvas, ctx);
    } else if (event.ctrlKey && event.key === "z") {
      this.state.history.undo(this.state.shapes);
      if (canvas && ctx) mouseEvent.drawShape(canvas, ctx);
    } else if (event.ctrlKey && event.shiftKey && event.key === "Z") {
      this.state.history.redo(this.state.shapes);
      if (canvas && ctx) mouseEvent.drawShape(canvas, ctx);
    }
  }
}
