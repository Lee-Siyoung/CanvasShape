export abstract class Shape {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isClick: boolean;
  color: string;
  selectionHandles: { x: number; y: number }[];

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    isClick = false,
    color = "#000000",
    selectionHandles = []
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isClick = isClick;
    this.color = color;
    this.selectionHandles = selectionHandles;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract drawHandle(ctx: CanvasRenderingContext2D): void;
  abstract isPointInside(x: number, y: number): boolean;
  abstract clone(): Shape;
  selectClick() {
    this.isClick = !this.isClick;
  }
}
