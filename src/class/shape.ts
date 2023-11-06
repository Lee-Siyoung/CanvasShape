export abstract class Shape {
  x: number;
  y: number;
  type: string;
  click: boolean;

  constructor(x: number, y: number, type: string, click = false) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.click = click;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    click: boolean
  ) {
    super(x, y, "rectangle", click);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export class Triangle extends Shape {
  height: number;
  base: number;

  constructor(
    x: number,
    y: number,
    base: number,
    height: number,
    click: boolean
  ) {
    super(x, y, "triangle", click);
    this.base = base;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x - this.base / 2, this.y + this.height / 2);
    ctx.lineTo(this.x + this.base / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.stroke();
  }
}

export class Circle extends Shape {
  radius: number;

  constructor(x: number, y: number, radius: number, click: boolean) {
    super(x, y, "circle", click);
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}
