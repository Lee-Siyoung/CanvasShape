import { Shape } from "@/class/shape";

export const undoCreate = (shape: Shape[]) => {
  shape.pop();
};
