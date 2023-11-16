import { Shape } from "@/class/shape";
import { IHistory } from "../history";

export const redoMove = (shape: Shape[], history: IHistory) => {
  const moveHistory = history.Move;
  if (moveHistory) {
    const moveShape = shape.find((s) => s.id === moveHistory.shapeId);
    if (moveShape) {
      moveShape.x = moveHistory.newX;
      moveShape.y = moveHistory.newY;
    }
  }
};
