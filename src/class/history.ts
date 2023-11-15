import { Shape } from "./shape";
interface Create {
  shape: Shape;
}
interface Move {
  shapeId: number;
  oldX: number;
  oldY: number;
  newX: number;
  newY: number;
}
interface Delete {
  shape: Shape;
}
export interface IHistory {
  Create?: Create;
  Move?: Move;
  Delete?: Delete;
}

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
      if (historyId.Create) {
        shape.pop();
      } else if (historyId.Move) {
        const moveHistory = historyId.Move;
        const moveShape = shape.find((s) => s.id === moveHistory.shapeId);
        if (moveShape) {
          moveShape.x = historyId.Move.oldX;
          moveShape.y = historyId.Move.oldY;
        }
      } else if (historyId.Delete) {
        shape.push(historyId.Delete.shape);
      }
    }
  }

  redo(shape: Shape[]) {
    if (this.historyId < this.history.length - 1) {
      this.historyId++;
      const historyId = this.history[this.historyId];
      if (historyId.Create) {
        shape.push(historyId.Create.shape);
      } else if (historyId.Move) {
        const moveHistory = historyId.Move;
        const moveShape = shape.find((s) => s.id === moveHistory.shapeId);
        if (moveShape) {
          moveShape.x = historyId.Move.newX;
          moveShape.y = historyId.Move.newY;
        }
      } else if (historyId.Delete) {
        const deleteHistory = historyId.Delete;
        shape = shape.filter((shape) => shape.id !== deleteHistory.shape.id);
      }
    }
  }
}
