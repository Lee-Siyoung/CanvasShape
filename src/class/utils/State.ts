import { Shape } from "../shape/Shape";
import { History } from "../history/History";

export interface State {
  shapes: Shape[];
  mouseX: number;
  mouseY: number;
  oriX: number;
  oriY: number;
  oriW: number;
  oriH: number;
  ShapeIndex: number;
  isDragging: boolean;
  shapeId: number;
  history: History;
  isResizing: boolean;
  resizeHandleIndex: number;
}
