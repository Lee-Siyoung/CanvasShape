import { Shape } from "./shape";

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    width: number,
    height: number
  ) {
    super(id, x, y, isClick);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
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
      this.width,
      this.height
    );
  }
}

export class Triangle extends Shape {
  width: number;
  height: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    width: number,
    height: number
  ) {
    super(id, x, y, isClick);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.stroke();
  }
  isPointInside(x: number, y: number): boolean {
    const aPoint = { x: this.x, y: this.y };
    const bPoint = { x: this.x - this.width, y: this.y + this.height };
    const cPoint = { x: this.x + this.width, y: this.y + this.height };

    const areaOrig =
      (-bPoint.y * cPoint.x +
        aPoint.y * (-bPoint.x + cPoint.x) +
        aPoint.x * (bPoint.y - cPoint.y) +
        bPoint.x * cPoint.y) /
      2;
    const sign = areaOrig < 0 ? -1 : 1;
    const area1 =
      (aPoint.y * cPoint.x -
        aPoint.x * cPoint.y +
        (cPoint.y - aPoint.y) * x +
        (aPoint.x - cPoint.x) * y) *
      sign;
    const area2 =
      (aPoint.x * bPoint.y -
        aPoint.y * bPoint.x +
        (aPoint.y - bPoint.y) * x +
        (bPoint.x - aPoint.x) * y) *
      sign;
    return area1 > 0 && area2 > 0 && area1 + area2 < 2 * areaOrig * sign;
  }
  clone(): Shape {
    return new Triangle(
      this.id,
      this.x,
      this.y,
      this.isClick,
      this.width,
      this.height
    );
  }
}

export class Circle extends Shape {
  radius: number;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    radius: number
  ) {
    super(id, x, y, isClick);
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  isPointInside(x: number, y: number): boolean {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
  }
  clone(): Shape {
    return new Circle(this.id, this.x, this.y, this.isClick, this.radius);
  }
}

export class Text extends Shape {
  content: string;
  fontSize: number;
  fontFamily: string;

  constructor(
    id: number,
    x: number,
    y: number,
    isClick: boolean,
    content: string,
    fontSize = 16,
    fontFamily = "Arial"
  ) {
    super(id, x, y, isClick);
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
      this.content,
      this.fontSize,
      this.fontFamily
    );
  }
}
