import { Shape } from "./Shape";

export class Circle extends Shape {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    isClick: boolean,
    color: string,
    selectionHandles: { x: number; y: number }[]
  ) {
    super(id, x, y, width, height, isClick, color, (selectionHandles = []));
    this.selectionHandles = selectionHandles;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const radius = this.width / 2;
    ctx.beginPath();
    ctx.arc(this.x + radius, this.y + radius, radius, 0, Math.PI * 2);
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
        x: this.x + this.width - 4,
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
        y: this.y + this.width - 4,
      }, // bottom left
      {
        x: this.x - 4,
        y: this.y - 4,
      },
      {
        x: this.x + this.width - 4,
        y: this.y + this.width - 4,
      }, // bottom right
    ];

    ctx.strokeStyle = "#778899";
    ctx.lineWidth = 3;
    this.selectionHandles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, 8, 8);
    });
    ctx.strokeRect(this.x, this.y, this.width, this.width);
  }
  isPointInside(x: number, y: number): boolean {
    const distance = Math.sqrt(
      (x - this.x - this.width / 2) ** 2 + (y - this.y - this.width / 2) ** 2
    );
    return distance <= this.width / 2;
  }
  clone(): Shape {
    return new Circle(
      this.id,
      this.x,
      this.y,
      this.width,
      this.height,
      this.isClick,
      this.color,
      this.selectionHandles
    );
  }
}
