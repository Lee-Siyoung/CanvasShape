import { Shape } from "./shape";

export class History {
  history: Shape[][];
  historyIdx: number;
  constructor(history: Shape[][], historyIdx: number) {
    this.history = history;
    this.historyIdx = historyIdx;
  }
  updateHistory(shapes: Shape[]) {
    this.history = this.history.slice(0, this.historyIdx + 1);
    this.history.push(shapes.map((shape) => shape.clone()));
    this.historyIdx++;
    console.log(this.history);
  }
  undo() {
    if (this.historyIdx > 0) {
      this.historyIdx--;
      const shapes = this.history[this.historyIdx].map((shape) =>
        shape.clone()
      );
      return shapes;
    }
  }
  redo() {
    if (this.historyIdx < this.history.length - 1) {
      this.historyIdx++;
      const shapes = this.history[this.historyIdx].map((shape) =>
        shape.clone()
      );
      return shapes;
    }
  }
}
