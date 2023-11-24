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
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
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
    ctx.beginPath();
    if (this.height < 0) {
      ctx.moveTo(this.x + this.width / 2, this.y);
      ctx.lineTo(this.x + this.width / 2, this.y + 30);
      ctx.strokeRect(this.x + this.width / 2 - 4, this.y + 30, 8, 8);
    } else {
      ctx.moveTo(this.x + this.width / 2, this.y);
      ctx.lineTo(this.x + this.width / 2, this.y - 30);
      ctx.strokeRect(this.x + this.width / 2 - 4, this.y - 38, 8, 8);
    }
    ctx.stroke();
  }
  isPointInside(x: number, y: number): boolean {
    const shape_left = this.x;
    const shape_right = this.x + this.width;
    const shape_top = this.y;
    const shape_bottom = this.y + this.height;
    return (
      x > shape_left && x < shape_right && y > shape_top && y < shape_bottom
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
