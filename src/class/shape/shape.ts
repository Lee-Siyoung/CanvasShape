import { State } from "../utils/State";

export abstract class Shape {
  id: number;
  x: number;
  y: number;
  isClick: boolean;
  color: string;
  state: State;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick = false,
    color = "#000000",
    state: State
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isClick = isClick;
    this.color = color;
    this.state = state;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract drawHandle(ctx: CanvasRenderingContext2D): void;
  abstract isPointInside(x: number, y: number): boolean;
  abstract clone(): Shape;
  selectClick() {
    this.isClick = !this.isClick;
  }
}
