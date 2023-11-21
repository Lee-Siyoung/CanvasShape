import { Shape } from "./Shape";

export class Circle extends Shape {
  radius: number;
  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    selectionHandles: { x: number; y: number }[],
    radius: number
  ) {
    super(id, x, y, isClick, color, (selectionHandles = []));
    this.radius = radius;
    this.selectionHandles = [];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(
      this.x + this.radius,
      this.y + this.radius,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    if (this.isClick) {
      this.drawHandle(ctx);
    }
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    this.selectionHandles = [];

    this.selectionHandles = [
      {
        x: this.x - 4,
        y: this.y - 4,
      }, // top left
      {
        x: this.x - 4,
        y: this.y - 4,
      },
      {
        x: this.x + this.radius * 2 - 4,
        y: this.y - 4,
      }, // top right
      {
        x: this.x - 4,
        y: this.y - 4,
      },
      {
        x: this.x - 4,
        y: this.y - 4,
      },
      {
        x: this.x - 4,
        y: this.y + this.radius * 2 - 4,
      }, // bottom left
      {
        x: this.x - 4,
        y: this.y - 4,
      },
      {
        x: this.x + this.radius * 2 - 4,
        y: this.y + this.radius * 2 - 4,
      }, // bottom right
    ];

    ctx.strokeStyle = "#778899";
    ctx.lineWidth = 3;
    this.selectionHandles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, 8, 8);
    });
    ctx.strokeRect(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  isPointInside(x: number, y: number): boolean {
    const distance = Math.sqrt(
      (x - this.x - this.radius) ** 2 + (y - this.y - this.radius) ** 2
    );
    return distance <= this.radius;
  }
  clone(): Shape {
    return new Circle(
      this.id,
      this.x,
      this.y,
      this.isClick,
      this.color,
      this.selectionHandles,
      this.radius
    );
  }
}
