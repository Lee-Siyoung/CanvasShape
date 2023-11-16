export abstract class Shape {
  id: number;
  x: number;
  y: number;
  isClick: boolean;
  color: string;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick = false,
    color = "#000000"
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isClick = isClick;
    this.color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInside(x: number, y: number): boolean;
  abstract clone(): Shape;
  selectClick() {
    this.isClick = !this.isClick;
  }
}
