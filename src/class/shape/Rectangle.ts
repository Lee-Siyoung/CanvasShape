import { RotateRectangleXY } from "../rotate/RotateRectangleXY";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
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
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.isClick) {
      this.drawHandle(ctx);
      this.drawRotate(ctx);
    }
    ctx.restore();
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    this.selectionHandles = [];

    // top left, middle, right
    this.selectionHandles.push({ x: this.x - 4, y: this.y - 4 });
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
    const rotatedPoint = RotateRectangleXY(
      x,
      y,
      centerX,
      centerY,
      -this.rotation
    );
    const shapeLeft = this.x;
    const shapeRight = this.x + this.width;
    const shapeTop = this.y;
    const shapeBottom = this.y + this.height;
    return (
      rotatedPoint.x > shapeLeft &&
      rotatedPoint.x < shapeRight &&
      rotatedPoint.y > shapeTop &&
      rotatedPoint.y < shapeBottom
    );
  }
  clone(): Shape {
    return new Rectangle(
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
