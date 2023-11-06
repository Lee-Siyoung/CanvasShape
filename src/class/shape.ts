export abstract class Shape {
  x: number;
  y: number;
  click: boolean;

  constructor(x: number, y: number, click = false) {
    this.x = x;
    this.y = y;
    this.click = click;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInside(x: number, y: number): boolean;
  toggleClick() {
    this.click = !this.click;
  }
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
    super(x, y, click);
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
    super(x, y, click);
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
  isPointInside(x: number, y: number): boolean {
    const A = { x: this.x, y: this.y - this.height / 2 };
    const B = {
      x: this.x - this.base / 2,
      y: this.y + this.height / 2,
    };
    const C = {
      x: this.x + this.base / 2,
      y: this.y + this.height / 2,
    };
    const areaOrig = Math.abs(
      (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2.0
    );
    const area1 = Math.abs(
      (x * (B.y - C.y) + B.x * (C.y - y) + C.x * (y - B.y)) / 2.0
    );
    const area2 = Math.abs(
      (A.x * (y - C.y) + x * (C.y - A.y) + C.x * (A.y - y)) / 2.0
    );
    const area3 = Math.abs(
      (A.x * (B.y - y) + B.x * (y - A.y) + x * (A.y - B.y)) / 2.0
    );
    if (areaOrig == area1 + area2 + area3) return true;
    else return false;
  }
}

export class Circle extends Shape {
  radius: number;

  constructor(x: number, y: number, radius: number, click: boolean) {
    super(x, y, click);
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
}
