import { Shape } from "../shape/Shape";
import { History } from "../history/History";

export interface State {
  shapes: Shape[];
  copyShape: Shape | null;
  history: History;
  mouseX: number;
  mouseY: number;
  oriX: number;
  oriY: number;
  oriW: number;
  oriH: number;
  ShapeIndex: number;
  shapeId: number;
  resizeHandleIndex: number;
  rotateHandle: { x: number; y: number };
  isDragging: boolean;
  isResizing: boolean;
  isMovingArrow: boolean;
  isRotating: boolean;
}
