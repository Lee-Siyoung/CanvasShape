import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const undoResize = (shape: Shape[], history: IHistory) => {
  const resizeHistory = history.Resize;
  if (resizeHistory) {
    const resizeShape = shape.find((s) => s.id === resizeHistory.shapeId);
    if (resizeShape) {
      resizeShape.x = resizeHistory.oldX;
      resizeShape.y = resizeHistory.oldY;
      resizeShape.width = resizeHistory.oldW;
      resizeShape.height = resizeHistory.oldH;
    }
  }
};
