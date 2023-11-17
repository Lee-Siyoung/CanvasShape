import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const undoColor = (shape: Shape[], history: IHistory) => {
  const colorHistory = history.Color;
  if (colorHistory) {
    const ColorShape = shape.find((s) => s.id === colorHistory.shapeId);
    if (ColorShape) {
      ColorShape.color = colorHistory.oldColor;
    }
  }
};
