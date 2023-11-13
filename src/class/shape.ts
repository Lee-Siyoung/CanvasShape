export abstract class Shape {
  x: number;
  y: number;
  isClick: boolean;

  constructor(x: number, y: number, isClick = false) {
    this.x = x;
    this.y = y;
    this.isClick = isClick;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInside(x: number, y: number): boolean;
  abstract clone(): Shape;
  selectClick() {
    this.isClick = !this.isClick;
  }
}
