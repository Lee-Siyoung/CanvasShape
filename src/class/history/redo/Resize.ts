import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const redoResize = (shape: Shape[], history: IHistory) => {
  const resizeHistory = history.Resize;
  if (resizeHistory) {
    const resizeShape = shape.find((s) => s.id === resizeHistory.shapeId);
    if (resizeShape) {
      resizeShape.x = resizeHistory.newX;
      resizeShape.y = resizeHistory.newY;
      resizeShape.width = resizeHistory.newW;
      resizeShape.height = resizeHistory.newH;
    }
  }
};
