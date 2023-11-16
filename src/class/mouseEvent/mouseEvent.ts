import { Shape } from "../shape/shape";
import { History } from "../history/history";

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
export class MouseEventClass {
  state: State;
  constructor(state: State) {
    this.state = state;
  }
  drawShape(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const shape of this.state.shapes) {
        ctx.strokeStyle = shape.isClick
          ? this.state.clickColor
          : this.state.notClickColor;
        shape.draw(ctx);
      }
    }
  }
}
