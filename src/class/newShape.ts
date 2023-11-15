import { Rectangle, Triangle, Circle, Text } from "./extendShapes";
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
      false,
      width,
      height
    );
    return rectangle;
  } else if (shape == "triangle" && canvas && ctx) {
    const width = Math.random() * 100 + 30;
    const height = Math.random() * 100 + 30;
    const triangle = new Triangle(
      id,
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
      id,
      Math.random() * (canvas.width - radius),
      Math.random() * (canvas.height - radius),
      false,
      radius
    );
    return circle;
  } else if (shape == "text" && canvas && ctx) {
    const text = new Text(
      id,
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      false,
      textContent || "example",
      fontSize || 16,
      fontFamily || "Arial"
    );
    return text;
  }
};
