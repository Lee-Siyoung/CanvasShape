import { Shape } from "@/class/shape/shape";

export const undoCreate = (shape: Shape[]) => {
  shape.pop();
};
