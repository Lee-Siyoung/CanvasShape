import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const undoRotate = (shape: Shape[], history: IHistory) => {
  const rotateHistory = history.Rotate;
  if (rotateHistory) {
    const rotateShape = shape.find((s) => s.id === rotateHistory.shapeId);
    if (rotateShape) {
      rotateShape.rotation = rotateHistory.oldRotation;
    }
  }
};
