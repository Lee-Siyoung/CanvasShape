import { History } from "./history/history";
import { Shape } from "./shape/shape";
export type State = {
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
};
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
  onClick(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    event: MouseEvent
  ): void {
    if (canvas) {
      event.preventDefault();
      if (event.ctrlKey) {
        for (const shape of this.state.shapes) {
          if (shape.isPointInside(this.state.mouseX, this.state.mouseY)) {
            shape.selectClick();
          }
        }
      } else {
        for (const shape of this.state.shapes) {
          if (shape.isPointInside(this.state.mouseX, this.state.mouseY)) {
            shape.selectClick();
          } else {
            shape.isClick = false;
          }
        }
      }
      this.drawShape(canvas, ctx);
    }
  }
  onMouseDown(canvas: HTMLCanvasElement, event: MouseEvent): void {
    if (canvas) {
      event.preventDefault();
      this.state.mouseX = event.clientX - canvas.getBoundingClientRect().left;
      this.state.mouseY = event.clientY - canvas.getBoundingClientRect().top;
      let index = 0;
      if (event.ctrlKey) {
        for (const shape of this.state.shapes) {
          if (shape.isPointInside(this.state.mouseX, this.state.mouseY)) {
            this.state.ShapeIndex = index;
            this.state.oriX = this.state.shapes[this.state.ShapeIndex].x;
            this.state.oriY = this.state.shapes[this.state.ShapeIndex].y;
            this.state.isDragging = true;
            shape.selectClick();
          }
          index++;
        }
      } else {
        for (const shape of this.state.shapes) {
          if (shape.isPointInside(this.state.mouseX, this.state.mouseY)) {
            this.state.ShapeIndex = index;
            this.state.oriX = this.state.shapes[this.state.ShapeIndex].x;
            this.state.oriY = this.state.shapes[this.state.ShapeIndex].y;
            this.state.isDragging = true;
            shape.selectClick();
          } else {
            shape.isClick = false;
          }
          index++;
        }
      }
    }
  }
  onMouseMove(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    event: MouseEvent
  ): void {
    if (!this.state.isDragging) return;
    else {
      event.preventDefault();
      if (canvas) {
        const moveX = event.clientX - canvas.getBoundingClientRect().left;
        const moveY = event.clientY - canvas.getBoundingClientRect().top;
        this.state.shapes[this.state.ShapeIndex].x += moveX - this.state.mouseX;
        this.state.shapes[this.state.ShapeIndex].y += moveY - this.state.mouseY;
        this.drawShape(canvas, ctx);
        this.state.mouseX = moveX;
        this.state.mouseY = moveY;
      }
    }
  }
  onMouseUp(event: MouseEvent): void {
    if (!this.state.isDragging) {
      return;
    }
    event.preventDefault();
    const moveShape = this.state.shapes[this.state.ShapeIndex];
    if (this.state.oriX !== moveShape.x && this.state.oriY !== moveShape.y) {
      this.state.history.pushHistory({
        Move: {
          shapeId: moveShape.id,
          oldX: this.state.oriX,
          oldY: this.state.oriY,
          newX: moveShape.x,
          newY: moveShape.y,
        },
      });
    }
    this.state.isDragging = false;
    for (const shape of this.state.shapes) {
      if (shape.isPointInside(this.state.mouseX, this.state.mouseY)) {
        shape.selectClick();
      }
    }
  }
}
