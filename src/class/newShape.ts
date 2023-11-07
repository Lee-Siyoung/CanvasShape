import { Rectangle, Triangle, Circle } from "./extendsShape";
export const newShape = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  shape: string
) => {
  if (shape == "rectangle" && canvas && ctx) {
    const width = Math.random() * 100 + 30;
    const height = Math.random() * 100 + 30;
    const rectangle = new Rectangle(
      Math.random() * (canvas.width - width),
      Math.random() * (canvas.height - height),
      false,
      width,
      height
    );
    return rectangle;
  } else if (shape == "triangle" && canvas && ctx) {
    const width = Math.random() * 100 + 30;
    const height = Math.random() * 100 + 30;
    const triangle = new Triangle(
      Math.random() * (canvas.width - width),
      Math.random() * (canvas.height - height),
      false,
      width,
      height
    );
    return triangle;
  } else if (shape == "circle" && canvas && ctx) {
    const radius = Math.random() * 100 + 30;
    const circle = new Circle(
      Math.random() * (canvas.width - radius),
      Math.random() * (canvas.height - radius),
      false,
      radius
    );
    return circle;
  }
};
