import { Shape } from "./Shape";

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    width: number,
    height: number
  ) {
    super(id, x, y, isClick, color);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    //ctx.strokeStyle = "#ffffff";
    //ctx.fillStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
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
      this.isClick,
      this.color,
      this.width,
      this.height
    );
  }
}
