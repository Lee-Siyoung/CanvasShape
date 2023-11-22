import { Rectangle } from "./Rectangle";
import { Triangle } from "./Triangle";
import { Circle } from "./Circle";
import { Text } from "./Text";
export const newShape = (
  id: number,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  shape: string,
  textContent?: string,
  fontSize?: number,
  fontFamily?: string
) => {
  if (shape == "rectangle" && canvas && ctx) {
    const width = Math.random() * 100 + 30;
    const height = Math.random() * 100 + 30;
    const rectangle = new Rectangle(
      id,
      Math.random() * (canvas.width - width),
      Math.random() * (canvas.height - height),
      width,
      height,
      false,
      "#000000",
      []
    );
    return rectangle;
  } else if (shape == "triangle" && canvas && ctx) {
    const width = Math.random() * 100 + 30;
    const height = Math.random() * 100 + 30;
    const triangle = new Triangle(
      id,
      Math.random() * (canvas.width - width),
      Math.random() * (canvas.height - height),
      width,
      height,
      false,
      "#000000",
      []
    );
    return triangle;
  } else if (shape == "circle" && canvas && ctx) {
    const radius = Math.random() * 100 + 30;
    const circle = new Circle(
      id,
      Math.random() * (canvas.width - radius),
      Math.random() * (canvas.height - radius),
      radius * 2,
      radius * 2,
      false,
      "#000000",
      []
    );
    return circle;
  } else if (shape == "text" && canvas && ctx) {
    const text = new Text(
      id,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      16,
      16,
      false,
      "#000000",
      [],
      textContent || "example",
      fontSize || 16,
      fontFamily || "Arial"
    );
    return text;
  }
};
