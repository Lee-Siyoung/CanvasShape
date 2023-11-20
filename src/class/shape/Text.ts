import { State } from "../utils/State";
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
    state: State,
    content: string,
    fontSize = 16,
    fontFamily = "Arial"
  ) {
    super(id, x, y, isClick, color, state);
    this.content = content;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.content, this.x, this.y);
    if (this.isClick) {
      this.drawHandle(ctx);
    }
  }
  drawHandle(ctx: CanvasRenderingContext2D): void {
    const textMetrics = ctx.measureText(this.content);
    const textWidth = textMetrics.width;
    const textHeight = this.fontSize;
    this.state.selectionHandles = [];

    // top left, middle, right
    this.state.selectionHandles.push({ x: this.x - 6, y: this.y - 18 });
    this.state.selectionHandles.push({
      x: this.x + (textWidth + 4) / 2 - 5,
      y: this.y - 18,
    });
    this.state.selectionHandles.push({
      x: this.x + textWidth - 2,
      y: this.y - 18,
    });

    // middle left
    this.state.selectionHandles.push({
      x: this.x - 6,
      y: this.y + (textHeight + 4) / 2 - 18,
    });

    // middle right
    this.state.selectionHandles.push({
      x: this.x + textWidth - 2,
      y: this.y + (textHeight + 4) / 2 - 18,
    });

    // bottom left, middle, right
    this.state.selectionHandles.push({
      x: this.x - 6,
      y: this.y + textHeight - 14,
    });
    this.state.selectionHandles.push({
      x: this.x + (textWidth + 4) / 2 - 6,
      y: this.y + textHeight - 14,
    });
    this.state.selectionHandles.push({
      x: this.x + textWidth - 2,
      y: this.y + textHeight - 14,
    });

    ctx.strokeStyle = "#778899";
    ctx.lineWidth = 3;
    this.state.selectionHandles.forEach((handle) => {
      ctx.strokeRect(handle.x, handle.y, 8, 8);
    });
    ctx.strokeRect(this.x - 2, this.y - 14, textWidth + 4, textHeight + 4);
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
      this.state,
      this.content,
      this.fontSize,
      this.fontFamily
    );
  }
}
