import { Shape } from "@/class/shape/Shape";

export const undoCreate = (shape: Shape[]) => {
  shape.pop();
};
