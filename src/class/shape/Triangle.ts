import { Shape } from "./shape";

export class Triangle extends Shape {
  width: number;
  height: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    width: number,
    height: number
  ) {
    super(id, x, y, isClick);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.stroke();
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
      this.width,
      this.height
    );
  }
}