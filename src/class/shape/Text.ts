import { Shape } from "./Shape";

export class Text extends Shape {
  content: string;
  fontSize: number;
  fontFamily: string;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    color: string,
    content: string,
    fontSize = 16,
    fontFamily = "Arial"
  ) {
    super(id, x, y, isClick, color);
    this.content = content;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.fillText(this.content, this.x, this.y);
  }
  isPointInside(x: number, y: number): boolean {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) {
      return false;
    }
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    const textMetrics = ctx.measureText(this.content);
    const textWidth = textMetrics.width;
    const textHeight = this.fontSize;
    const textLeft = this.x;
    const textRight = this.x + textWidth;
    const textTop = this.y - textHeight;
    const textBottom = this.y;

    return x >= textLeft && x <= textRight && y >= textTop && y <= textBottom;
  }

  clone(): Shape {
    return new Text(
      this.id,
      this.x,
      this.y,
      this.isClick,
      this.color,
      this.content,
      this.fontSize,
      this.fontFamily
    );
  }
}
