import { RotateTriangleXY } from "../rotate/RotateTriangleXY";
import { Shape } from "./Shape";

export class Triangle extends Shape {
  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    isClick: boolean,
    color: string,
    selectionHandles: { x: number; y: number }[],
    rotation: number
  ) {
    super(
      id,
      x,
      y,
      width,
      height,
      isClick,
      color,
      (selectionHandles = []),
      rotation
    );
    this.selectionHandles = selectionHandles;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));

    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    if (this.isClick) {
      this.drawHandle(ctx);
      this.drawRotate(ctx);
    }
    ctx.restore();
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    this.selectionHandles = [];

    // top left, middle, right
    this.selectionHandles.push({
      x: this.x - 4,
      y: this.y - 4,
    });
    this.selectionHandles.push({
      x: this.x + this.width / 2 - 4,
      y: this.y - 4,
    });
    this.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y - 4,
    });

    // middle left
    this.selectionHandles.push({
      x: this.x - 4,
      y: this.y + this.height / 2 - 4,
    });

    // middle right
    this.selectionHandles.push({
      x: this.x + this.width - 4,
      y: this.y + this.height / 2 - 4,
    });

    // bottom left, middle, right
    this.selectionHandles.push({
      x: this.x - 4,
      y: this.y + this.height - 4,
    });
    this.selectionHandles.push({
      x: this.x + this.width / 2 - 4,
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
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  drawRotate(ctx: CanvasRenderingContext2D): void {
    const lineY = this.height < 0 ? 30 : -30;
    const rectY = this.height < 0 ? 30 : -38;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y + lineY);
    ctx.strokeRect(this.x + this.width / 2 - 4, this.y + rectY, 8, 8);
    ctx.stroke();
  }
  isPointInside(x: number, y: number) {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const aPoint = { x: this.x + this.width / 2, y: this.y };
    const bPoint = { x: this.x, y: this.y + this.height };
    const cPoint = { x: this.x + this.width, y: this.y + this.height };
    const rotatedAPoint = RotateTriangleXY(
      aPoint,
      centerX,
      centerY,
      this.rotation
    );
    const rotatedBPoint = RotateTriangleXY(
      bPoint,
      centerX,
      centerY,
      this.rotation
    );
    const rotatedCPoint = RotateTriangleXY(
      cPoint,
      centerX,
      centerY,
      this.rotation
    );
    return this.isPointArea(
      { x, y },
      rotatedAPoint,
      rotatedBPoint,
      rotatedCPoint
    );
  }

  isPointArea(
    pt: { x: number; y: number },
    v1: { x: number; y: number },
    v2: { x: number; y: number },
    v3: { x: number; y: number }
  ) {
    const d1 = this.area(pt, v1, v2);
    const d2 = this.area(pt, v2, v3);
    const d3 = this.area(pt, v3, v1);

    const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
    const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

    return !(hasNeg && hasPos);
  }
  area(
    p1: { x: number; y: number },
    p2: { y: number; x: number },
    p3: { x: number; y: number }
  ) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  }

  clone(): Shape {
    return new Triangle(
      this.id,
      this.x,
      this.y,
      this.width,
      this.height,
      this.isClick,
      this.color,
      this.selectionHandles,
      this.rotation
    );
  }
}
