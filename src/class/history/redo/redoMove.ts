import { Shape } from "../../shape";
import { IHistory } from "../history";

export const undoMove = (shape: Shape[], historyId: IHistory) => {
  const moveHistory = historyId.Move;
  if (moveHistory) {
    const moveShape = shape.find((s) => s.id === moveHistory.shapeId);
    if (moveShape) {
      moveShape.x = moveHistory.newX;
      moveShape.y = moveHistory.newY;
    }
  }
};
