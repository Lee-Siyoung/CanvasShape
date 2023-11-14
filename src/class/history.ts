import { Shape } from "./shape";
export type IHistory =
  | { type: "create"; shape: Shape }
  | {
      type: "move";
      shapeId: number;
      oldX: number;
      oldY: number;
      newX: number;
      newY: number;
    }
  | { type: "delete"; shape: Shape };

export class History {
  history: IHistory[];
  historyId: number;

  constructor(history: IHistory[], historyId: number) {
    this.history = history;
    this.historyId = historyId;
  }

  pushHistory(history: IHistory) {
    this.history = this.history.slice(0, this.historyId + 1);
    this.history.push(history);
    this.historyId++;
  }

  undo(shape: Shape[]) {
    if (this.historyId > 0) {
      const historyId = this.history[this.historyId];
      this.historyId--;
      switch (historyId.type) {
        case "create":
          shape.pop();
          break;
        case "move": {
          const moveShape = shape.find((s) => s.id === historyId.shapeId);
          if (moveShape) {
            moveShape.x = historyId.oldX;
            moveShape.y = historyId.oldY;
          }
          break;
        }
        case "delete":
          shape.push(historyId.shape);
          break;
      }
    }
  }

  redo(shape: Shape[]) {
    if (this.historyId < this.history.length - 1) {
      this.historyId++;
      const historyId = this.history[this.historyId];
      switch (historyId.type) {
        case "create":
          shape.push(historyId.shape);
          break;
        case "move": {
          const moveShape = shape.find((s) => s.id === historyId.shapeId);
          if (moveShape) {
            moveShape.x = historyId.newX;
            moveShape.y = historyId.newY;
          }
          break;
        }
        case "delete":
          shape = shape.filter((shape) => shape.id !== historyId.shape.id);
          break;
      }
    }
  }
}
