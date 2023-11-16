import { Shape } from "./Shape";

export class Circle extends Shape {
  radius: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    radius: number
  ) {
    super(id, x, y, isClick, color);
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
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
      this.radius
    );
  }
}
