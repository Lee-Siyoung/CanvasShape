import { Shape } from "./Shape";

export class Triangle extends Shape {
  width: number;
  height: number;
  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    selectionHandles: { x: number; y: number }[],
    width: number,
    height: number
  ) {
    super(id, x, y, isClick, color, (selectionHandles = []));
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    if (this.isClick) {
      this.drawHandle(ctx);
    }
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    this.selectionHandles = [];

    // top left, middle, right
    this.selectionHandles.push({
      x: this.x - this.width - 4,
      y: this.y - 4,
    });
    this.selectionHandles.push({
      x: this.x - 4,
      y: this.y - 4,
    });
    this.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y - 4,
    });

    // middle left
    this.selectionHandles.push({
      x: this.x - this.width - 4,
      y: this.y + this.height / 2 - 4,
    });

    // middle right
    this.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y + this.height / 2 - 4,
    });

    // bottom left, middle, right
    this.selectionHandles.push({
      x: this.x - this.width - 4,
      y: this.y + this.height - 4,
    });
    this.selectionHandles.push({
      x: this.x - 4,
      y: this.y + this.height - 4,
    });
    this.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y + this.height - 4,
    });

    ctx.strokeStyle = "#778899";
    ctx.lineWidth = 3;
    this.selectionHandles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, 8, 8);
    });
    ctx.strokeRect(this.x - this.width, this.y, this.width * 2, this.height);
  }
  isPointInside(x: number, y: number): boolean {
    const aPoint = { x: this.x, y: this.y };
    const bPoint = { x: this.x - this.width, y: this.y + this.height };
    const cPoint = { x: this.x + this.width, y: this.y + this.height };

    const areaOrig =
      (-bPoint.y * cPoint.x +
        aPoint.y * (-bPoint.x + cPoint.x) +
        aPoint.x * (bPoint.y - cPoint.y) +
        bPoint.x * cPoint.y) /
      2;
    const sign = areaOrig < 0 ? -1 : 1;
    const area1 =
      (aPoint.y * cPoint.x -
        aPoint.x * cPoint.y +
        (cPoint.y - aPoint.y) * x +
        (aPoint.x - cPoint.x) * y) *
      sign;
    const area2 =
      (aPoint.x * bPoint.y -
        aPoint.y * bPoint.x +
        (aPoint.y - bPoint.y) * x +
        (bPoint.x - aPoint.x) * y) *
      sign;
    return area1 > 0 && area2 > 0 && area1 + area2 < 2 * areaOrig * sign;
  }
  clone(): Shape {
    return new Triangle(
      this.id,
      this.x,
      this.y,
      this.isClick,
      this.color,
      this.selectionHandles,
      this.width,
      this.height
    );
  }
}
