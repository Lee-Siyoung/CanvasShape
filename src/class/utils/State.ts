import { Shape } from "../shape/shape";
import { History } from "../history/history";

export interface State {
  shapes: Shape[];
  mouseX: number;
  mouseY: number;
  oriX: number;
  oriY: number;
  ShapeIndex: number;
  isDragging: boolean;
  clickColor: string;
  notClickColor: string;
  history: History;
}
