import { Shape } from "../shape/Shape";
import { History } from "../history/History";
import { HandleState } from "./HandleState";

export interface State {
  shapes: Shape[];
  mouseX: number;
  mouseY: number;
  oriX: number;
  oriY: number;
  ShapeIndex: number;
  isDragging: boolean;
  shapeId: number;
  history: History;
  selectionHandles: HandleState[];
}
