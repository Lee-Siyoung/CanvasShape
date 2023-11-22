import { Shape } from "../shape/Shape";
import { redoCreate } from "./redo/Create";
import { redoDelete } from "./redo/Delete";
import { redoMove } from "./redo/Move";
import { redoColor } from "./redo/Color";
import { undoCreate } from "./undo/Create";
import { undoDelete } from "./undo/Delete";
import { undoMove } from "./undo/Move";
import { undoColor } from "./undo/Color";
import { undoResize } from "./undo/Resize";
import { redoResize } from "./redo/Resize";
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
interface Color {
  shapeId: number;
  oldColor: string;
  newColor: string;
}
interface Resize {
  shapeId: number;
  oldX: number;
  oldY: number;
  newX: number;
  newY: number;
  oldW: number;
  oldH: number;
  newW: number;
  newH: number;
}
export interface IHistory {
  Create?: Create;
  Move?: Move;
  Delete?: Delete;
  Color?: Color;
  Resize?: Resize;
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
      } else if (historyId.Color) {
        undoColor(shape, historyId);
      } else if (historyId.Resize) {
        undoResize(shape, historyId);
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
        redoMove(shape, historyId);
      } else if (historyId.Delete) {
        redoDelete(shape, historyId);
      } else if (historyId.Color) {
        redoColor(shape, historyId);
      } else if (historyId.Resize) {
        redoResize(shape, historyId);
      }
    }
  }
}
