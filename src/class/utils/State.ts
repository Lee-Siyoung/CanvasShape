import { Shape } from "../shape/Shape";
import { History } from "../history/History";

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
