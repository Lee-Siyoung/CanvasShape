import { State } from "../utils/State";
import { Shape } from "./Shape";

export class Circle extends Shape {
  radius: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    state: State,
    radius: number
  ) {
    super(id, x, y, isClick, color, state);
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    if (this.isClick) {
      this.drawHandle(ctx);
    }
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    const width = this.radius * 2;
    const height = this.radius * 2;
    this.state.selectionHandles = [];

    // top left, middle, right
    this.state.selectionHandles.push({
      x: this.x - 2 - this.radius,
      y: this.y - 4 - this.radius,
    });
    this.state.selectionHandles.push({
      x: this.x + width / 2 - this.radius,
      y: this.y - 4 - this.radius,
    });
    this.state.selectionHandles.push({
      x: this.x + width - 4 - this.radius,
      y: this.y - 4 - this.radius,
    });

    // middle left
    this.state.selectionHandles.push({
      x: this.x - 4 - this.radius,
      y: this.y + height / 2 - 4 - this.radius,
    });

    // middle right
    this.state.selectionHandles.push({
      x: this.x + width - 4 - this.radius,
      y: this.y + height / 2 - 4 - this.radius,
    });

    // bottom left, middle, right
    this.state.selectionHandles.push({
      x: this.x - 4 - this.radius,
      y: this.y + height - 4 - this.radius,
    });
    this.state.selectionHandles.push({
      x: this.x + width / 2 - 4 - this.radius,
      y: this.y + height - 4 - this.radius,
    });
    this.state.selectionHandles.push({
      x: this.x + width - 4 - this.radius,
      y: this.y + height - 4 - this.radius,
    });
    ctx.strokeStyle = "#778899";
    ctx.lineWidth = 3;
    this.state.selectionHandles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, 8, 8);
    });
    ctx.strokeRect(this.x - width / 2, this.y - height / 2, width, height);
  }
  isPointInside(x: number, y: number): boolean {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
  }
  clone(): Shape {
    return new Circle(
      this.id,
      this.x,
      this.y,
      this.isClick,
      this.color,
      this.state,
      this.radius
    );
  }
}
