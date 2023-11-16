import { Shape } from "../shape";
import { redoCreate } from "./redo/redoCreate";
import { redoDelete } from "./redo/redoDelete";
import { undoCreate } from "./undo/undoCreate";
import { undoDelete } from "./undo/undoDelete";
import { undoMove } from "./undo/undoMove";
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

  pushHistory(history: IHistory): void {
    this.history = this.history.slice(0, this.historyId + 1);
    this.history.push(history);
    this.historyId++;
  }

  undo(shape: Shape[]): void {
    if (this.historyId > 0) {
      const historyId = this.history[this.historyId];
      this.historyId--;
      if (historyId.Create) {
        undoCreate(shape);
      } else if (historyId.Move) {
        undoMove(shape, historyId);
      } else if (historyId.Delete) {
        undoDelete(shape, historyId);
      }
    }
  }

  redo(shape: Shape[]): void {
    if (this.historyId < this.history.length - 1) {
      this.historyId++;
      const historyId = this.history[this.historyId];
      if (historyId.Create) {
        redoCreate(shape, historyId);
      } else if (historyId.Move) {
        undoMove(shape, historyId);
      } else if (historyId.Delete) {
        redoDelete(shape, historyId);
      }
    }
  }
}
