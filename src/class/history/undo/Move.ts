import { Shape } from "@/class/shape/Shape";
import { IHistory } from "../History";

export const undoMove = (shape: Shape[], history: IHistory) => {
  const moveHistory = history.Move;
  if (moveHistory) {
    const moveShape = shape.find((s) => s.id === moveHistory.shapeId);
    if (moveShape) {
      moveShape.x = moveHistory.oldX;
      moveShape.y = moveHistory.oldY;
    }
  }
};
